import React, { useEffect, useMemo, useState } from 'react';
import Icon from '../components/Icon';

const formatMoney = (value) => `₹${Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const dateTime = (value) => value ? new Date(value).toLocaleString('en-IN') : '—';

export default function PaymentSettings({ authFetch, apiBase }) {
  const [settings, setSettings] = useState(null);
  const [queue, setQueue] = useState([]);
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [loadingQueue, setLoadingQueue] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUploaded, setSelectedFileUploaded] = useState(false);
  const [localPreview, setLocalPreview] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [reviewForms, setReviewForms] = useState({});

  const enabled = Boolean(settings?.enabled);
  const qrUploaded = Boolean(settings?.qrUploaded);
  const imageUrl = useMemo(() => `${String(apiBase || '').replace(/\/+$/, '')}/api/payment-methods/static-qr/image?t=${encodeURIComponent(settings?.updatedAt || '')}`, [apiBase, settings?.updatedAt]);

  useEffect(() => {
    if (!selectedFile) { setLocalPreview(''); return undefined; }
    const url = URL.createObjectURL(selectedFile);
    setLocalPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const loadSettings = async () => {
    setLoadingSettings(true);
    try {
      const result = await authFetch('/api/admin/payment-settings/static-qr');
      setSettings(result || {});
    } catch (e) {
      setError(e.message || 'Unable to load QR payment settings.');
    } finally {
      setLoadingSettings(false);
    }
  };

  const loadQueue = async (status = statusFilter) => {
    setLoadingQueue(true);
    try {
      const result = await authFetch(`/api/admin/payment-settings/manual-payments?status=${encodeURIComponent(status)}`);
      const items = Array.isArray(result) ? result : [];
      setQueue(items);
      setReviewForms((previous) => {
        const next = { ...previous };
        items.forEach((item) => {
          if (!next[item.id]) next[item.id] = {
            transactionReference: item.transactionReference || '',
            verifiedAmount: item.expectedAmount == null ? '' : String(item.expectedAmount),
            note: ''
          };
        });
        return next;
      });
    } catch (e) {
      setError(e.message || 'Unable to load manual payment submissions.');
    } finally {
      setLoadingQueue(false);
    }
  };

  useEffect(() => {
    loadSettings();
    loadQueue('PENDING');
  }, []);

  const chooseFile = (event) => {
    setMessage('');
    setError('');
    setSelectedFileUploaded(false);
    const file = event.target.files?.[0] || null;
    if (!file) { setSelectedFile(null); return; }
    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setSelectedFile(null);
      setError('Choose a PNG, JPEG, or WebP image.');
      event.target.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSelectedFile(null);
      setError('The QR image must be 2 MB or smaller.');
      event.target.value = '';
      return;
    }
    setSelectedFile(file);
  };

  const uploadQr = async (event) => {
    event.preventDefault();
    if (!selectedFile) { setError('Select a QR image before uploading.'); return; }
    setUploading(true); setError(''); setMessage('');
    try {
      const form = new FormData();
      form.append('file', selectedFile);
      const result = await authFetch('/api/admin/payment-settings/static-qr/image', { method: 'POST', body: form });
      setSettings(result || {});
      setSelectedFileUploaded(true);
      const input = document.getElementById('static-qr-file');
      if (input) input.value = '';
      setMessage('QR image uploaded. Static payments are disabled until you enable them.');
    } catch (e) {
      setError(e.message || 'QR image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const toggleQr = async () => {
    setError(''); setMessage('');
    const next = enabled ? 'NO' : 'YES';
    if (next === 'YES' && !qrUploaded) {
      setError('Upload a QR image before enabling static payments.');
      return;
    }
    try {
      const result = await authFetch(`/api/admin/payment-settings/static-qr/toggle?toggle_static_payment=${next}`, { method: 'PATCH' });
      setSettings(result || {});
      setMessage(next === 'YES' ? 'Static QR payments are enabled.' : 'Static QR payments are disabled.');
    } catch (e) {
      setError(e.message || 'Unable to update QR payment status.');
    }
  };

  const updateReviewForm = (id, key, value) => {
    setReviewForms((previous) => ({ ...previous, [id]: { ...(previous[id] || {}), [key]: value } }));
  };

  const reviewPayment = async (payment, action) => {
    const form = reviewForms[payment.id] || {};
    setError(''); setMessage('');
    if (action === 'confirm') {
      if (!form.transactionReference?.trim()) { setError('Enter the transaction reference you independently verified.'); return; }
      if (form.verifiedAmount === '' || !Number.isFinite(Number(form.verifiedAmount))) { setError('Enter the verified amount.'); return; }
      const accepted = window.confirm(`Confirm that you independently verified ₹${Number(form.verifiedAmount).toFixed(2)} in the receiving UPI/bank account for ${payment.professionalName || payment.mobile || 'this professional'}?`);
      if (!accepted) return;
    } else {
      const note = window.prompt('Reason for rejecting this payment (optional):', '');
      if (note === null) return;
      form.note = note;
    }
    setBusyId(payment.id);
    try {
      const path = `/api/admin/payment-settings/manual-payments/${encodeURIComponent(payment.id)}/${action}`;
      const body = action === 'confirm'
        ? { transactionReference: form.transactionReference.trim(), verifiedAmount: Number(form.verifiedAmount), note: form.note || '' }
        : { note: form.note || '' };
      await authFetch(path, { method: 'POST', body: JSON.stringify(body) });
      setMessage(action === 'confirm' ? 'Payment confirmed and settlement updated.' : 'Payment submission rejected.');
      await loadQueue(statusFilter);
    } catch (e) {
      setError(e.message || `Unable to ${action} this payment.`);
    } finally {
      setBusyId('');
    }
  };

  return (
    <section className="payment-settings-page">
      <div className="payment-settings-intro">
        <div>
          <span className="admin-kicker">PAYMENTS / CONFIGURATION</span>
          <h2>Payment settings</h2>
          <p>Manage the static UPI QR and review platform-fee payments submitted by professionals.</p>
        </div>
        <span className={`payment-state-pill ${enabled ? 'is-enabled' : 'is-disabled'}`}>
          <span className="status-dot" /> Static QR {enabled ? 'enabled' : 'disabled'}
        </span>
      </div>

      {error && <div className="admin-error global" role="alert">{error}</div>}
      {message && <div className="payment-notice" role="status"><Icon name="checkCircle" size={17} />{message}</div>}

      <div className="payment-settings-grid">
        <section className="admin-panel payment-qr-panel">
          <div className="panel-title">
            <div><span>STATIC UPI PAYMENT</span><h3>QR code configuration</h3></div>
            <Icon name="shield" size={22} />
          </div>
          {loadingSettings ? <div className="admin-loading">Loading payment settings…</div> : (
            <>
              <div className="payment-qr-preview">
                {localPreview ? <img src={localPreview} alt="Selected UPI QR preview" /> :
                  enabled && qrUploaded ? <img src={imageUrl} alt="Configured UPI payment QR" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> :
                    <div className="payment-qr-placeholder"><Icon name="image" size={35} /><strong>{qrUploaded ? 'QR uploaded but disabled' : 'No QR image uploaded'}</strong><span>Upload the receiving UPI QR image to configure manual payments.</span></div>}
              </div>
              <div className="payment-qr-metadata">
                <span><strong>File:</strong> {settings?.fileName || (qrUploaded ? 'Uploaded QR image' : 'None')}</span>
                <span><strong>Size:</strong> {settings?.imageSize ? `${(Number(settings.imageSize) / 1024).toFixed(1)} KB` : '—'}</span>
                <span><strong>Updated:</strong> {dateTime(settings?.updatedAt)}</span>
              </div>
              <form className="payment-upload-form" onSubmit={uploadQr}>
                <label className="payment-file-label" htmlFor="static-qr-file"><Icon name="upload" size={17} /> Choose QR image</label>
                <input id="static-qr-file" type="file" accept="image/png,image/jpeg,image/webp" onChange={chooseFile} />
                <small>PNG, JPEG or WebP · Maximum 2 MB. Replacing the image automatically disables payments until re-enabled.</small>
                {selectedFile && <div className="payment-selected-file"><Icon name="image" size={16} />{selectedFile.name}</div>}
                <button className="btn primary" type="submit" disabled={uploading || !selectedFile || selectedFileUploaded}>
                  {uploading ? 'Uploading…' : selectedFileUploaded ? 'QR image uploaded' : 'Upload QR image'}
                </button>
              </form>
              <div className="payment-toggle-row">
                <div><strong>Accept static UPI payments</strong><span>{enabled ? 'Professionals can view the QR.' : 'The QR is hidden from professionals.'}</span></div>
                <button className={`payment-toggle ${enabled ? 'on' : ''}`} type="button" onClick={toggleQr} disabled={loadingSettings || (!enabled && !qrUploaded)} aria-pressed={enabled}>
                  <span />{enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <p className="payment-security-note"><Icon name="shield" size={16} /> Only enable the QR after confirming it belongs to the correct receiving account. Uploaded QR images are stored by the backend.</p>
            </>
          )}
        </section>

        <section className="admin-panel payment-queue-panel">
          <div className="panel-title">
            <div><span>MANUAL SETTLEMENT</span><h3>Platform-fee submissions</h3></div>
            <button className="panel-link" onClick={() => loadQueue(statusFilter)} disabled={loadingQueue}><Icon name="spark" size={15} /> Refresh</button>
          </div>
          <div className="payment-queue-controls">
            <label htmlFor="payment-status-filter">Show submissions</label>
            <select id="payment-status-filter" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); loadQueue(e.target.value); }}>
              <option value="PENDING">Pending verification</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="REJECTED">Rejected</option>
              <option value="ALL">All submissions</option>
            </select>
          </div>
          {loadingQueue ? <div className="admin-loading">Loading payment submissions…</div> : !queue.length ? (
            <div className="payment-empty"><Icon name="checkCircle" size={28} /><strong>No submissions found</strong><span>There are no {statusFilter.toLowerCase()} manual payments in the current queue.</span></div>
          ) : (
            <div className="payment-submission-list">
              {queue.map((payment) => {
                const form = reviewForms[payment.id] || {};
                const pending = String(payment.status).toUpperCase() === 'PENDING';
                return (
                  <article className="payment-submission-card" key={payment.id}>
                    <div className="payment-submission-head">
                      <div><strong>{payment.professionalName || 'Professional'}</strong><span>{payment.mobile || payment.email || payment.professionalId || 'Contact unavailable'}</span></div>
                      <span className={`status ${(payment.status || 'unknown').toLowerCase()}`}>{payment.status || 'UNKNOWN'}</span>
                    </div>
                    <div className="payment-submission-details">
                      <div><small>Expected fee</small><strong>{formatMoney(payment.expectedAmount)}</strong></div>
                      <div><small>Submitted</small><strong>{dateTime(payment.submittedAt)}</strong></div>
                      <div className="payment-ref-value"><small>Submitted transaction reference</small><strong>{payment.transactionReference || '—'}</strong></div>
                    </div>
                    {payment.professionalNote && <p className="payment-professional-note">Professional note: {payment.professionalNote}</p>}
                    {payment.adminNote && <p className="payment-professional-note">Admin note: {payment.adminNote}</p>}
                    {pending && (
                      <div className="payment-review-form">
                        <label>Verified transaction reference
                          <input value={form.transactionReference || ''} onChange={(e) => updateReviewForm(payment.id, 'transactionReference', e.target.value)} />
                        </label>
                        <label>Verified amount (₹)
                          <input inputMode="decimal" type="number" min="0" step="0.01" value={form.verifiedAmount ?? ''} onChange={(e) => updateReviewForm(payment.id, 'verifiedAmount', e.target.value)} />
                        </label>
                        <label>Admin note (optional)
                          <input value={form.note || ''} onChange={(e) => updateReviewForm(payment.id, 'note', e.target.value)} placeholder="Bank verification details" />
                        </label>
                        <div className="payment-review-actions">
                          <button className="btn primary" type="button" disabled={busyId === payment.id} onClick={() => reviewPayment(payment, 'confirm')}>{busyId === payment.id ? 'Saving…' : 'Confirm verified payment'}</button>
                          <button className="btn outline" type="button" disabled={busyId === payment.id} onClick={() => reviewPayment(payment, 'reject')}>Reject submission</button>
                        </div>
                        <small className="payment-review-warning">Verify the funds and reference in the receiving bank/UPI account before confirming. A screenshot or submitted reference alone is not proof of payment.</small>
                      </div>
                    )}
                    {payment.reviewedAt && <small className="payment-reviewed-at">Reviewed {dateTime(payment.reviewedAt)}{payment.reviewedBy ? ` by ${payment.reviewedBy}` : ''}</small>}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';

import Icon from '../components/Icon';
import { SITE_CONFIG } from '../config';

const logo = SITE_CONFIG.logo;
const API_BASE = SITE_CONFIG.apiBaseUrl;

function AdminDashboard({ onExit }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('dhritex_admin_token') || '');
  const [login, setLogin] = useState({ username: '', password: '' });
  const [data, setData] = useState({ summary: null, users: [], professionals: [], areas: [], requests: [] });
  const [sort, setSort] = useState('desc');
  const [area, setArea] = useState('');
  const [mobileSearch, setMobileSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [requestSearch, setRequestSearch] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [docs, setDocs] = useState([]);
  const [docLoading, setDocLoading] = useState(false);
  const [activeView, setActiveView] = useState('overview');

  const authFetch = async (path, options = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401 || res.status === 403) {
      sessionStorage.removeItem('dhritex_admin_token');
      setToken('');
      throw new Error('Admin session expired. Please login again.');
    }

    if (!res.ok) {
      throw new Error((await res.text()) || 'Request failed');
    }

    return res.json();
  };

  const load = async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const [summary, users, professionals, requests] = await Promise.all([
        authFetch('/api/admin/dashboard'),
        authFetch('/api/admin/users'),
        authFetch(`/api/admin/professionals?sort=${sort}${area ? `&area=${encodeURIComponent(area)}` : ''}`),
        authFetch('/api/admin/nurse-service-requests')
      ]);

      setData({
        summary,
        users,
        professionals,
        requests,
        areas: summary.areaEarnings || []
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [token, sort, area]);

  const submitLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      });

      if (!res.ok) {
        throw new Error('Invalid admin username or password');
      }

      const body = await res.json();
      sessionStorage.setItem('dhritex_admin_token', body.token);
      setToken(body.token);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('dhritex_admin_token');
    setToken('');
    setData({ summary: null, users: [], professionals: [], areas: [], requests: [] });
  };

  const openProfessional = async (professional) => {
    setSelected(professional);
    setDocs([]);
    setDocLoading(true);

    try {
      setDocs(
        await authFetch(
          `/api/admin/professionals/${professional.professionalId}/documents`
        )
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setDocLoading(false);
    }
  };

  const verify = async (status) => {
    if (!selected) return;

    try {
      await authFetch(
        `/api/admin/professionals/${selected.professionalId}/verification?status=${status}`,
        { method: 'PATCH' }
      );

      setSelected(null);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const quickApprove = async (professional) => {
    try {
      await authFetch(
        `/api/admin/professionals/${professional.professionalId}/verification?status=APPROVED`,
        { method: 'PATCH' }
      );
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const goToView = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProfessionals = data.professionals.filter((professional) => {
    const query = mobileSearch.trim().replace(/\D/g, '');
    if (!query) return true;
    return String(professional.mobile || '').replace(/\D/g, '').includes(query);
  });

  const filteredUsers = data.users.filter((user) => {
    const query = userSearch.trim().toLowerCase();
    if (!query) return true;
    return [user.name, user.mobile, user.email, user.address]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  const filteredRequests = data.requests.filter((request) => {
    const query = requestSearch.trim().toLowerCase();
    const matchesSearch = !query || [
      request.nurseName,
      request.nurseMobile,
      request.requestedByName,
      request.requestedByMobile,
      request.completionCode,
      request.status,
      request.patientName
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));

    const matchesStatus = !requestStatus || request.status === requestStatus;

    return matchesSearch && matchesStatus;
  });

  const requestStatuses = [...new Set(
    data.requests.map((request) => request.status).filter(Boolean)
  )];

  const s = data.summary;
  const maxArea = Math.max(
    ...(data.areas || []).map((a) => Number(a.companyEarnings || 0)),
    1
  );

  if (!token) {
    return (
      <div className="admin-app admin-login-screen">
        <div className="admin-login-orb admin-login-orb-one" />
        <div className="admin-login-orb admin-login-orb-two" />
        <div className="admin-login-page">
          <button className="admin-back-link" onClick={onExit}>
            <Icon name="arrow" size={16} /> Back to dhritex.com
          </button>

          <div className="admin-login-card admin-login-card-new">
            <div className="admin-login-brand">
              <img className="admin-carenow-logo" src="/assets/carenow-logo.png" alt="CareNow" />
              <span>Admin Console</span>
            </div>

            <div className="admin-login-icon">
              <Icon name="shield" size={28} />
            </div>

            <span className="eyebrow">
              <Icon name="shield" size={15} /> Secure administration
            </span>

            <h1>Welcome to Admin.</h1>
            <p>
              Manage CareNow users, professionals, verification and company
              earnings from one secure workspace.
            </p>

            <form onSubmit={submitLogin} className="admin-login-form">
              <label>
                Username
                <input
                  value={login.username}
                  onChange={(e) =>
                    setLogin({ ...login, username: e.target.value })
                  }
                  autoComplete="username"
                  placeholder="Admin username"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={login.password}
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                  autoComplete="current-password"
                  placeholder="Admin password"
                  required
                />
              </label>

              {error && <div className="admin-error">{error}</div>}

              <button className="btn primary admin-login-submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Enter Admin Console'}
                {!loading && <Icon name="arrow" size={18} />}
              </button>
            </form>

            <div className="admin-login-security">
              <Icon name="checkCircle" size={17} />
              <span>Protected with your backend admin authentication.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <button className="admin-sidebar-brand" onClick={onExit}>
            <img className="admin-carenow-logo" src="/assets/carenow-logo.png" alt="CareNow" />
            <span>Admin Console</span>
          </button>

          <div className="admin-sidebar-status">
            <span className="status-dot" />
            System connected
          </div>

          <div className="admin-nav-group">
            <span className="admin-nav-label">WORKSPACE</span>
            <button
              className={activeView === 'overview' ? 'active' : ''}
              onClick={() => goToView('overview')}
            >
              <Icon name="chart" size={18} /> Overview
            </button>
            <button
              className={activeView === 'professionals' ? 'active' : ''}
              onClick={() => goToView('professionals')}
            >
              <Icon name="users" size={18} /> Professionals
              {s?.pendingProfessionals > 0 && (
                <b>{s.pendingProfessionals}</b>
              )}
            </button>
            <button
              className={activeView === 'users' ? 'active' : ''}
              onClick={() => goToView('users')}
            >
              <Icon name="users" size={18} /> Registered Users
            </button>
            <button
              className={activeView === 'requests' ? 'active' : ''}
              onClick={() => goToView('requests')}
            >
              <Icon name="chart" size={18} /> Service Requests
            </button>
          </div>

          <div className="admin-nav-group">
            <span className="admin-nav-label">ADMIN</span>
            <button onClick={load}>
              <Icon name="spark" size={18} /> Refresh data
            </button>
            <button onClick={onExit}>
              <Icon name="globe" size={18} /> View website
            </button>
          </div>
        </div>

        <div className="admin-sidebar-user">
          <div className="admin-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <span>Dhriti Infotech</span>
          </div>
          <button onClick={logout} title="Logout">
            <Icon name="logout" size={17} />
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-search-global">
            <Icon name="search" size={19} />
            <input
              placeholder="Search professionals by mobile number..."
              value={mobileSearch}
              onChange={(e) => {
                setMobileSearch(e.target.value);
                setActiveView('professionals');
              }}
              inputMode="tel"
            />
            <span>⌘ K</span>
          </div>
          <div className="admin-topbar-actions">
            <span className="admin-live-pill">
              <span className="status-dot" /> API Live
            </span>
            <button className="admin-top-icon" onClick={load} title="Refresh">
              <Icon name="spark" size={18} />
            </button>
            <button className="admin-top-icon" onClick={logout} title="Logout">
              <Icon name="logout" size={18} />
            </button>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <span className="admin-kicker">DHRITEX / ADMIN</span>
              <h1>
                {activeView === 'overview' && 'Operations overview'}
                {activeView === 'professionals' && 'Professional directory'}
                {activeView === 'users' && 'Registered users'}
                {activeView === 'requests' && 'Service requests'}
              </h1>
              <p>
                {activeView === 'overview' &&
                  'A live view of CareNow registrations, professional verification and earnings.'}
                {activeView === 'professionals' &&
                  'Search, review and approve CareNow professionals.'}
                {activeView === 'users' &&
                  'View all registered CareNow users and their account details.'}
                {activeView === 'requests' &&
                  'Review all nurse service requests, requester details, completion codes and current status.'}
              </p>
            </div>
            <div className="admin-heading-meta">
              <span>Updated just now</span>
              <button className="btn outline" onClick={load}>
                <Icon name="spark" size={16} /> Refresh
              </button>
            </div>
          </div>

          {error && <div className="admin-error global">{error}</div>}
          {loading && <div className="admin-loading">Loading latest data…</div>}

          {activeView === 'overview' && (
            <>
              <div className="admin-kpis admin-kpis-new">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-icon cyan"><Icon name="users" size={20} /></div>
                  <span>Registered users</span>
                  <strong>{s?.totalUsers ?? '—'}</strong>
                  <small>All CareNow accounts</small>
                </div>
                <div className="admin-kpi-card">
                  <div className="admin-kpi-icon navy"><Icon name="users" size={20} /></div>
                  <span>Professionals</span>
                  <strong>{s?.totalProfessionals ?? '—'}</strong>
                  <small>{s?.approvedProfessionals ?? 0} approved</small>
                </div>
                <div className="admin-kpi-card alert-card">
                  <div className="admin-kpi-icon gold"><Icon name="shield" size={20} /></div>
                  <span>Pending verification</span>
                  <strong>{s?.pendingProfessionals ?? '—'}</strong>
                  <small>Needs admin review</small>
                </div>
                <div className="admin-kpi-card">
                  <div className="admin-kpi-icon cyan"><Icon name="chart" size={20} /></div>
                  <span>Company earnings</span>
                  <strong>₹{Number(s?.totalCompanyEarnings || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
                  <small>Platform charges</small>
                </div>
              </div>

              <div className="admin-dashboard-grid">
                <div className="admin-panel admin-area-chart">
                  <div className="panel-title">
                    <div>
                      <span>Company earnings by area</span>
                      <h3>Area performance</h3>
                    </div>
                    <button className="panel-link" onClick={() => goToView('professionals')}>
                      View professionals <Icon name="arrow" size={15} />
                    </button>
                  </div>

                  <div className="area-bars">
                    {(data.areas || []).map((a) => {
                      const value = Number(a.companyEarnings || 0);
                      const height = Math.max(5, (value / maxArea) * 100);
                      return (
                        <div className="area-bar-item" key={a.area}>
                          <div className="area-bar-value">₹{value.toLocaleString('en-IN')}</div>
                          <div className="area-bar-track">
                            <div className="area-bar-fill" style={{ height: `${height}%` }} />
                          </div>
                          <span title={a.area}>{a.area}</span>
                        </div>
                      );
                    })}
                    {!data.areas?.length && (
                      <div className="empty-state">No area earnings recorded yet.</div>
                    )}
                  </div>
                </div>

                <div className="admin-panel admin-finance-panel">
                  <div className="panel-title">
                    <div>
                      <span>Financial snapshot</span>
                      <h3>Gross earnings</h3>
                    </div>
                    <Icon name="chart" size={22} />
                  </div>

                  <div className="financial-total financial-total-new">
                    <small>Total gross earnings</small>
                    <strong>₹{Number(s?.totalGrossEarnings || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
                  </div>

                  <div className="finance-ring-wrap">
                    <div
                      className="finance-ring"
                      style={{
                        '--finance-percent': `${s?.totalGrossEarnings ? Math.min(100, Number(s.totalCompanyEarnings) / Number(s.totalGrossEarnings) * 100) : 0}%`
                      }}
                    >
                      <div>
                        <strong>{s?.totalGrossEarnings ? Math.round(Number(s.totalCompanyEarnings) / Number(s.totalGrossEarnings) * 100) : 0}%</strong>
                        <span>Company</span>
                      </div>
                    </div>
                    <div className="finance-legend">
                      <span><i className="legend-company" /> Company ₹{Number(s?.totalCompanyEarnings || 0).toLocaleString('en-IN')}</span>
                      <span><i className="legend-professional" /> Professionals ₹{(Number(s?.totalGrossEarnings || 0) - Number(s?.totalCompanyEarnings || 0)).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-panel admin-quick-review">
                <div className="panel-title">
                  <div>
                    <span>Verification queue</span>
                    <h3>Professionals awaiting approval</h3>
                  </div>
                  <button className="panel-link" onClick={() => goToView('professionals')}>
                    Open directory <Icon name="arrow" size={15} />
                  </button>
                </div>
                <div className="queue-list">
                  {data.professionals.filter((p) => p.verificationStatus === 'PENDING').slice(0, 5).map((p) => (
                    <div className="queue-row" key={p.professionalId}>
                      <div className="queue-avatar">{String(p.fullName || 'P').charAt(0).toUpperCase()}</div>
                      <div className="queue-main">
                        <strong>{p.fullName}</strong>
                        <span>{p.mobile} · {p.serviceArea || 'Area not provided'}</span>
                      </div>
                      <span className="status pending">PENDING</span>
                      <button className="table-btn" onClick={() => openProfessional(p)}>Review</button>
                    </div>
                  ))}
                  {!data.professionals.some((p) => p.verificationStatus === 'PENDING') && (
                    <div className="empty-state">No professionals are waiting for approval.</div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeView === 'professionals' && (
            <div className="admin-panel admin-directory-panel">
              <div className="directory-toolbar">
                <div>
                  <span className="directory-count">{filteredProfessionals.length} shown</span>
                  {mobileSearch && <button className="clear-search" onClick={() => setMobileSearch('')}>Clear mobile search</button>}
                </div>
                <div className="admin-filters admin-filters-new">
                  <label>
                    Area
                    <select value={area} onChange={(e) => setArea(e.target.value)}>
                      <option value="">All areas</option>
                      {(data.areas || []).map((a) => (
                        <option key={a.area} value={a.area}>{a.area}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Earnings
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                      <option value="desc">Highest first</option>
                      <option value="asc">Lowest first</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="mobile-search-card">
                <div className="mobile-search-icon"><Icon name="phone" size={18} /></div>
                <div>
                  <span>Search professional</span>
                  <strong>Find by mobile number</strong>
                </div>
                <input
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="e.g. 9472501328"
                  inputMode="tel"
                />
              </div>

              <div className="table-wrap">
                <table className="admin-table admin-table-new">
                  <thead>
                    <tr>
                      <th>Professional</th>
                      <th>Type</th>
                      <th>Area</th>
                      <th>Verification</th>
                      <th>Earnings</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProfessionals.map((p) => (
                      <tr key={p.professionalId}>
                        <td>
                          <div className="professional-cell">
                            <div className="professional-avatar">{String(p.fullName || 'P').charAt(0).toUpperCase()}</div>
                            <div>
                              <strong>{p.fullName}</strong>
                              <small>{p.mobile} · {p.qualification || 'Qualification not provided'}</small>
                            </div>
                          </div>
                        </td>
                        <td>{p.professionalType || '—'}</td>
                        <td>{p.serviceArea || '—'}</td>
                        <td><span className={`status ${(p.verificationStatus || 'PENDING').toLowerCase()}`}>{p.verificationStatus || 'PENDING'}</span></td>
                        <td><strong>₹{Number(p.totalEarnings || 0).toLocaleString('en-IN')}</strong></td>
                        <td>
                          <div className="table-actions">
                            <button className="table-btn" onClick={() => openProfessional(p)}>Review</button>
                            {p.verificationStatus !== 'APPROVED' && (
                              <button className="approve-btn" onClick={() => quickApprove(p)}>
                                <Icon name="checkCircle" size={15} /> Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!filteredProfessionals.length && (
                <div className="empty-state">
                  No professional matches the selected mobile number and filters.
                </div>
              )}
            </div>
          )}

          {activeView === 'users' && (
            <div className="admin-panel admin-directory-panel">
              <div className="directory-toolbar">
                <div>
                  <span className="directory-count">{filteredUsers.length} users</span>
                </div>
                <div className="user-search-box">
                  <Icon name="search" size={17} />
                  <input
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search name, mobile or email"
                  />
                </div>
              </div>

              <div className="table-wrap">
                <table className="admin-table admin-table-new">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Address</th>
                      <th>Mobile</th>
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.accountId}>
                        <td>
                          <div className="professional-cell">
                            <div className="professional-avatar">{String(u.name || 'U').charAt(0).toUpperCase()}</div>
                            <div><strong>{u.name}</strong><small>User account</small></div>
                          </div>
                        </td>
                        <td>{u.email || '—'}<small>{u.mobile || '—'}</small></td>
                        <td>{u.address || '—'}</td>
                        <td><span className={`status ${u.mobileVerified ? 'approved' : 'pending'}`}>{u.mobileVerified ? 'Verified' : 'Pending'}</span></td>
                        <td>{u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('en-IN') : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!filteredUsers.length && <div className="empty-state">No users match the search.</div>}
            </div>
          )}

          {activeView === 'requests' && (
            <div className="admin-panel admin-directory-panel">
              <div className="directory-toolbar request-toolbar">
                <div>
                  <span className="directory-count">{filteredRequests.length} requests</span>
                  {requestSearch && (
                    <button className="clear-search" onClick={() => setRequestSearch('')}>
                      Clear search
                    </button>
                  )}
                </div>

                <div className="admin-filters admin-filters-new">
                  <label>
                    Status
                    <select value={requestStatus} onChange={(e) => setRequestStatus(e.target.value)}>
                      <option value="">All statuses</option>
                      {requestStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="request-search-card">
                <div className="mobile-search-icon"><Icon name="search" size={18} /></div>
                <div>
                  <span>Search requests</span>
                  <strong>Nurse, requester, mobile or completion code</strong>
                </div>
                <input
                  value={requestSearch}
                  onChange={(e) => setRequestSearch(e.target.value)}
                  placeholder="Search by mobile number or name"
                />
              </div>

              <div className="table-wrap">
                <table className="admin-table admin-table-new request-table">
                  <thead>
                    <tr>
                      <th>Nurse</th>
                      <th>Requested by</th>
                      <th>Completion code</th>
                      <th>Status</th>
                      <th>Requested</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.requestId}>
                        <td>
                          <div className="professional-cell">
                            <div className="professional-avatar">
                              {String(request.nurseName || 'N').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <strong>{request.nurseName || 'Not assigned'}</strong>
                              <small>{request.nurseMobile || 'Mobile not available'}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong>{request.requestedByName || 'Unknown user'}</strong>
                            <small>{request.requestedByMobile || 'Mobile not available'}</small>
                          </div>
                        </td>
                        <td>
                          <span className="completion-code">
                            {request.completionCode || '—'}
                          </span>
                        </td>
                        <td>
                          <span className={`status ${(request.status || 'UNKNOWN').toLowerCase()}`}>
                            {request.status || 'UNKNOWN'}
                          </span>
                        </td>
                        <td>
                          <strong>
                            {request.requestedAt
                              ? new Date(request.requestedAt).toLocaleString('en-IN')
                              : '—'}
                          </strong>
                          <small>{request.patientName || 'Patient not provided'}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!filteredRequests.length && (
                <div className="empty-state">
                  No nurse service requests match the selected filters.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {selected && (
        <div className="admin-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="admin-modal admin-review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">Verification review</span>
                <h3>{selected.fullName}</h3>
                <p>{selected.mobile} · {selected.serviceArea || 'Area not provided'}</p>
              </div>
              <button className="icon-btn" onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="detail-grid">
              <div><span>Professional type</span><strong>{selected.professionalType || '—'}</strong></div>
              <div><span>Qualification</span><strong>{selected.qualification || '—'}</strong></div>
              <div><span>Registration no.</span><strong>{selected.registrationNumber || '—'}</strong></div>
              <div><span>Service area</span><strong>{selected.serviceArea || '—'}</strong></div>
              <div><span>Experience</span><strong>{selected.experienceYears ?? 0} years</strong></div>
              <div><span>Mobile verification</span><strong>{selected.mobileVerified ? 'Verified' : 'Not verified'}</strong></div>
            </div>

            <div className="documents-box">
              <div className="panel-title">
                <div>
                  <span>Verification documents</span>
                  <h3>Certificates &amp; supporting files</h3>
                </div>
                <Icon name="file" size={21} />
              </div>

              {docLoading ? (
                <p>Loading documents…</p>
              ) : docs.length ? (
                docs.map((d) => (
                  <a
                    className="document-row"
                    key={d.id}
                    href={`${API_BASE}${d.downloadUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="file" size={18} />
                    <span>
                      <strong>{d.documentType}</strong>
                      <small>{d.fileName} · {(d.size / 1024 / 1024).toFixed(2)} MB</small>
                    </span>
                    <Icon name="arrow" size={16} />
                  </a>
                ))
              ) : (
                <div className="empty-state">
                  No certificates have been uploaded yet. The current registration record contains qualification and registration-number details only.
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn outline" onClick={() => verify('REJECTED')}>
                <Icon name="xCircle" size={17} /> Reject
              </button>
              {selected.verificationStatus !== 'APPROVED' && (
                <button className="btn primary" onClick={() => verify('APPROVED')}>
                  <Icon name="checkCircle" size={17} /> Approve professional
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

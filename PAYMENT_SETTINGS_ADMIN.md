# Admin Payment Settings integration

## What changed
- Added `src/pages/PaymentSettings.jsx` with real API-backed QR upload/settings and manual-payment review queue.
- Added the Payment Settings navigation item and route/view to `src/pages/AdminDashboard.jsx`.
- Added responsive styles to `src/styles.css` and image/upload icons to `src/components/Icon.jsx`.
- Updated the project README with API and build instructions.

## Backend contract expected
- `GET /api/admin/payment-settings/static-qr` -> `{ enabled, qrUploaded, contentType, fileName, imageSize, updatedBy, updatedAt }`
- `POST /api/admin/payment-settings/static-qr/image` -> multipart form field `file`
- `PATCH /api/admin/payment-settings/static-qr/toggle?toggle_static_payment=YES|NO`
- `GET /api/admin/payment-settings/manual-payments?status=PENDING|CONFIRMED|REJECTED|ALL` -> array with `id`, `professionalId`, `professionalName`, `mobile`, `email`, `expectedAmount`, `transactionReference`, `professionalNote`, `status`, `verifiedAmount`, `adminNote`, `reviewedBy`, `submittedAt`, `reviewedAt`
- `POST /api/admin/payment-settings/manual-payments/{id}/confirm` -> `{ transactionReference, verifiedAmount, note }`
- `POST /api/admin/payment-settings/manual-payments/{id}/reject` -> `{ note }`

The admin component calls the endpoints using the existing bearer token from the Admin Console. It does not add a second login/session mechanism and does not use mock data.

## Operational safety
- The QR is displayed to professionals only when the backend setting is enabled and an image exists.
- Uploading a replacement image disables static payments until explicitly re-enabled.
- Confirm requires an explicit browser confirmation and warns the operator to independently verify funds. The server remains responsible for amount/reference validation and transactional settlement.
- The dashboard does not claim that a submitted transaction reference is proof of payment.

# Dhriti Infotech — dhritex.com

React + Vite company website for Dhriti Infotech, adapted from the supplied Hopewell template structure and restyled to match the dhritex.com logo palette.

## Included sections

- Home / hero
- Company overview
- Products — CareNow
- CareNow user, professional and login screenshots
- Clients — Freshzo
- Leadership — Roshan and Jyoti
- Contact details
- Floating WhatsApp and email actions
- Responsive mobile navigation
- Responsive layouts for desktop, tablet and mobile

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deploy

The project is Vite-compatible and can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages or any static hosting provider.

## Contact details configured

- Phone: +91 9472501328
- Email: infotech.dhriti@gmail.com
- Address: Hitech City, Hyderabad, Telangana, India
- WhatsApp: https://wa.me/919472501328

## Template note

The supplied Hopewell template was used as the visual/layout reference. The original template's README identifies it as MIT licensed and credits K29Solutions / ThemeWagon. The Dhriti Infotech implementation replaces the charity content with company/product content and uses the supplied dhritex.com logo and CareNow screenshots.


## Admin Console — Payment Settings

The admin console now includes **Payment Settings** in the sidebar. It uses the authenticated admin token already issued by `/api/admin/login`.

### Static UPI QR
- `GET /api/admin/payment-settings/static-qr` reads QR configuration.
- `POST /api/admin/payment-settings/static-qr/image` uploads the selected image as multipart field `file`.
- `PATCH /api/admin/payment-settings/static-qr/toggle?toggle_static_payment=YES|NO` enables or disables static QR payments.
- PNG, JPEG and WebP files up to 2 MB are accepted by the UI; the backend must validate the actual image content as well.
- Replacing the QR automatically disables the method; an administrator must explicitly enable it again.

### Manual platform-fee verification
- `GET /api/admin/payment-settings/manual-payments?status=PENDING` lists submissions for review.
- `POST /api/admin/payment-settings/manual-payments/{id}/confirm` sends `transactionReference`, `verifiedAmount`, and optional `note`.
- `POST /api/admin/payment-settings/manual-payments/{id}/reject` sends an optional `note`.
- The administrator must verify receipt in the receiving bank/UPI account before confirming. A submitted reference or screenshot is not proof of funds received.

### Configuration
Set `VITE_API_BASE_URL` to the deployed backend URL when building the admin app (for example, `https://api.dhritex.com`). The current fallback in `src/config.js` remains `http://localhost:8082`.

### Build and deploy
```bash
npm ci
npm run build
```
The repository's GitHub Pages workflow builds `dist` from source. `node_modules` and stale build output are intentionally omitted from the source archive; dependencies are restored by `npm ci`.


## Dhriti Enterprises tracker data

The default checklist/stage definitions are stored in `src/data/dhriti-enterprises-tracker.json` and bundled into the frontend at build time. This JSON file is the seed/template data; it is not a writable live database. Runtime edits are currently saved in the browser's Local Storage (`dhriti_enterprises_tracker_v1` and `dhriti_enterprise_contacts`). Browser storage can be cleared and is not shared across devices. To make edits durable and shared, implement authenticated backend APIs and persist tracker records in the server database. A JSON file on a static website cannot safely be updated by browser code, and redeploying the site can replace files.

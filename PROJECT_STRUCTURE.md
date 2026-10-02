# Dhritex.com frontend structure

The public website and Admin Console are intentionally separated into different page components.

```text
src/
├── App.jsx
├── config.js
├── main.jsx
├── components/
│   ├── Icon.jsx
│   └── SectionHeading.jsx
├── pages/
│   ├── HomePage.jsx
│   └── AdminDashboard.jsx
└── styles.css
```

## Routing

- `#/` or no hash → `HomePage`
- `#/admin` → `AdminDashboard`

The public website has no Admin Console markup inside `HomePage.jsx`. The only connection is the `onOpenAdmin` callback passed from `App.jsx`.

## API configuration

`src/config.js` contains the shared API configuration. Set `VITE_API_BASE_URL` in `.env` for deployment.

## Service Request Analytics

The Admin Console includes a Service Requests view backed by:

`GET /api/admin/nurse-service-requests`

The view supports searching by nurse/requester name, mobile number, completion code, or status and filtering by request status.

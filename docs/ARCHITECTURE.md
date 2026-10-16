# Architecture

Luxe Pups Grooming (`luxepupsutah.com`) — mobile dog grooming business site + back office.

```
┌─────────────────────┐        ┌──────────────────────┐       ┌────────────┐
│  React (Vite) SPA   │  HTTPS │  ASP.NET Core API    │  EF   │ PostgreSQL │
│  / (public site)    │ ─────► │  backend/LuxePups.Api│ ────► │            │
│  #/admin (back off.)│        │  JWT auth, REST      │       └────────────┘
└─────────────────────┘        │                      │  SMTP ┌────────────┐
   GitHub Pages                │  MailKit EmailService│ ────► │ mail server│
   (static hosting)            └──────────────────────┘       │ dev:Mailpit│
                                                              └────────────┘
```

## Pieces

| Piece | Where | Doc |
|---|---|---|
| Public site (homepage, booking form) | `src/App.jsx`, `src/index.css` | [FRONTEND-PUBLIC.md](FRONTEND-PUBLIC.md) |
| Admin panel (tabs: bookings, customers, inventory, finance, services, email, admins) | `src/admin/` | [FRONTEND-ADMIN.md](FRONTEND-ADMIN.md) |
| REST API | `backend/LuxePups.Api/` | [BACKEND.md](BACKEND.md), [API.md](API.md) |
| Database schema | EF Core migrations | [DATA-MODEL.md](DATA-MODEL.md) |
| Email (booking notifications + mass campaigns) | `backend/.../Services/EmailService.cs` | [EMAIL.md](EMAIL.md) |
| Local stack & deployment | `docker-compose.yml`, `backend/Dockerfile` | [DOCKER-DEPLOY.md](DOCKER-DEPLOY.md) |

## Key decisions

- **Routing:** `HashRouter` (`#/admin`) because GitHub Pages can't rewrite paths for an SPA.
  The public page stays exactly as it was at `/`; the admin panel is lazy-loaded.
- **Auth:** custom minimal JWT (BCrypt password hashes) instead of ASP.NET Identity — one
  table, easy to reason about, no scaffolded magic. Owner account is seeded
  (`Luxepupsut@gmail.com`) and cannot be deleted; owner/admins can add more admins.
- **No third-party email API:** plain SMTP via MailKit. Any mailbox for the domain works
  (registrar email, Zoho, etc.). Local dev uses Mailpit so email "just works" offline.
- **Customer dedupe:** the database enforces one row per email (unique index, lowercase).
  Booking submissions upsert; the mailing list resolves recipients at send time and
  dedupes again by email. There is deliberately no "import/copy" path that could fork a
  person into two rows.
- **Dynamic content:** services/pricing live in the DB and feed both the homepage and the
  booking dropdown, so the owner can change offerings without a deploy. The homepage keeps
  a hardcoded fallback so the static site still renders if the API is unreachable.
- **Money:** `decimal` end-to-end, USD, no floats.

## Environments

| | Frontend | API | DB | SMTP |
|---|---|---|---|---|
| Local dev | `npm run dev` :5173 | Docker :5080 | Docker :5432 | Mailpit :1025 (UI :8025) |
| Production | GitHub Pages (this repo) | needs a host (Railway/Fly/VPS…) | managed Postgres | real mailbox for luxepupsutah.com |

Frontend finds the API through `VITE_API_URL` (build-time). See DOCKER-DEPLOY.md.

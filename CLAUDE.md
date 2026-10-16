# Luxe Pups Grooming — luxepupsutah.com

Mobile dog grooming site (Vite + React) + back office (ASP.NET Core + Postgres + Docker).

**Read the doc for the area you're touching before editing — each one is the source of
truth for its section and keeps context small:**

| Working on… | Read |
|---|---|
| System overview / where things live | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| DB tables, customer statuses, dedupe rules | [docs/DATA-MODEL.md](docs/DATA-MODEL.md) |
| Any endpoint (shapes, auth, errors) | [docs/API.md](docs/API.md) |
| .NET backend code | [docs/BACKEND.md](docs/BACKEND.md) |
| Public homepage / booking form | [docs/FRONTEND-PUBLIC.md](docs/FRONTEND-PUBLIC.md) |
| Admin panel tabs | [docs/FRONTEND-ADMIN.md](docs/FRONTEND-ADMIN.md) |
| Email sending / SMTP / Mailpit | [docs/EMAIL.md](docs/EMAIL.md) |
| Running locally, env vars, deploying | [docs/DOCKER-DEPLOY.md](docs/DOCKER-DEPLOY.md) |

## Quick facts

- Frontend: Vite + React 19, no TypeScript. Public page `src/App.jsx`, admin `src/admin/`.
  Routing is **HashRouter** (`#/admin`) because of GitHub Pages.
- Backend: single project `backend/LuxePups.Api` (.NET 10, EF Core + Npgsql, MailKit,
  BCrypt, JWT). Migrations auto-apply on startup.
- Run stack: `docker compose up --build` (API :5080, Postgres :5432, Mailpit UI :8025),
  frontend `npm run dev` (:5173).
- Seeded owner login: `ahenriquez200528@gmail.com` / env `ADMIN_SEED_PASSWORD`.
- Design rules (public page): keep the existing palette CSS variables, flat aesthetic,
  no new emojis, Playfair Display headings + DM Sans body. See `REDESIGN_SPEC.md`.
- Emails are stored lowercase everywhere; one Customer row per email — never create a
  parallel "person" table or import path that bypasses the upsert.

## Conventions

- API errors: `{ "error": "message" }`; enums serialize as lowercase strings.
- Money is `decimal`/`numeric` USD. Timestamps UTC `timestamptz`.
- When adding an endpoint: update `docs/API.md` in the same change.
- When changing a table: new EF migration + update `docs/DATA-MODEL.md`.

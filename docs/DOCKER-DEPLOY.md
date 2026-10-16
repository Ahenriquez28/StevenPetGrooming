# Docker & Deployment

## Run everything locally

```bash
cp .env.example .env        # then edit if you want; defaults work out of the box
docker compose up --build   # postgres + API + mailpit
npm install && npm run dev  # frontend on http://localhost:5173
```

| Service | URL |
|---|---|
| Frontend (Vite dev) | http://localhost:5173 |
| Admin panel | http://localhost:5173/#/admin |
| API | http://localhost:5080/api |
| Mailpit (caught emails) | http://localhost:8025 |
| Postgres | localhost:5432 (`luxepups` / password from `.env`) |

First login: `Luxepupsut@gmail.com` + the `ADMIN_SEED_PASSWORD` from `.env`.
**Change it immediately in production** (the seed password only applies on first boot).

The API auto-applies EF migrations on startup — no manual DB setup.

## Environment variables (.env)

| Var | Purpose |
|---|---|
| `POSTGRES_PASSWORD` | DB password (compose wires it into both containers) |
| `JWT__SECRET` | HS256 signing key — 32+ random chars, rotate = everyone logs out |
| `ADMIN_SEED_PASSWORD` | first-boot password for the seeded owner account |
| `Smtp__*` | see [EMAIL.md](EMAIL.md) |
| `CORS__ORIGINS` | comma-separated allowed origins |

## Deploying for real

The repo currently deploys **only the static frontend** to GitHub Pages
(`.github/workflows/deploy.yml`, CNAME → luxepupsutah.com). GitHub Pages cannot run .NET
or Postgres, so the backend needs its own host:

1. **API + DB**: any Docker host works — Railway / Fly.io / Render / a $5 VPS.
   `backend/Dockerfile` is production-ready (multi-stage, runs migrations on boot).
   Point it at a managed Postgres (or run the compose file on a VPS).
2. **Set env vars** on that host: real `JWT__SECRET`, real `Smtp__*` (see EMAIL.md),
   `CORS__ORIGINS=https://luxepupsutah.com`.
3. **DNS**: add `api.luxepupsutah.com` → your API host.
4. **Frontend**: set repo variable `VITE_API_URL=https://api.luxepupsutah.com/api` in the
   GitHub Pages build workflow, push, done. (Locally it defaults to
   `http://localhost:5080/api`; the public page also works with the API completely
   offline — booking form shows an error, services fall back to hardcoded.)

## Gotchas

- `docker compose down -v` wipes the database volume — customers, notes, everything.
  Without `-v` your data survives restarts.
- Postgres data lives in the `luxepups_pgdata` named volume; back it up with
  `docker exec luxepups-db pg_dump -U luxepups luxepups > backup.sql`.

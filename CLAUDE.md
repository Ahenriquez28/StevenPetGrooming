# Luxe Pups Grooming — luxepupsutah.com

Static React site (Vite) on GitHub Pages + one Cloudflare Worker that emails booking
requests via Resend. **No server, no database.**

| Working on… | Read |
|---|---|
| System overview, request flow, security, deploying | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Accounts, DNS records, secrets, common tasks | [docs/THIRD-PARTY-SERVICES.md](docs/THIRD-PARTY-SERVICES.md) |
| Booking/confirmation emails, Resend, troubleshooting | [docs/EMAIL.md](docs/EMAIL.md) |
| Google / favicon / sitemap | [docs/SEO.md](docs/SEO.md) |

`docs/archive/` holds plans for a .NET + Postgres back office that was **never built** — ignore it.

## Quick facts

- Frontend: Vite + React 19, no TypeScript, everything in `src/App.jsx`. Dev: `npm run dev` (:5173).
- API: `worker/` (Cloudflare Worker). Dev: `cd worker && npm run dev` (:8787, secret in `.dev.vars`).
  Deploy: `cd worker && npx wrangler deploy` (manual; the site deploys on push to `main`).
- `RESEND_API_KEY` is a Worker secret only. Never commit it or put it in `VITE_*`.
- Design rules: keep the palette CSS variables, flat aesthetic, no new emojis,
  Playfair Display headings + DM Sans body. See `REDESIGN_SPEC.md`.

# Architecture

Luxe Pups Grooming — `https://luxepupsutah.com`. A static React site plus one
serverless function that emails booking requests. **There is no server and no database.**

```
 Visitor's browser
      │  1. loads site
      ▼
 Cloudflare (DNS + proxy) ───► GitHub Pages  (static files built from this repo)
      │
      │  2. submits booking form  POST https://api.luxepupsutah.com/bookings
      ▼
 Cloudflare Worker "luxepups-api"   (worker/src/index.js)
      │  validate → rate-limit → build emails
      │  3. HTTPS + RESEND_API_KEY (Worker secret)
      ▼
 Resend (email API) ──► owner inbox (Luxepupsut@gmail.com)   [Reply-To = customer]
                    └─► customer inbox                       [confirmation, best effort]
```

## The pieces

| Piece | Where | What it does |
|---|---|---|
| Public site | `src/App.jsx`, `src/index.css`, `index.html` | Single-page React (Vite) site: home + About (state-switched, no URL change) + booking form |
| Booking API | `worker/` (Cloudflare Worker) | Receives the form, validates it, sends two emails via Resend |
| Hosting | GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main` | Serves `dist/` |
| DNS / CDN / TLS | Cloudflare (free plan) | Resolves the domain, proxies the site, issues TLS certs, hosts the Worker |
| Email sending | Resend | Delivers mail from `noreply@luxepupsutah.com` |
| Domain registration | Porkbun | Registrar only; nameservers point to Cloudflare |

See [THIRD-PARTY-SERVICES.md](THIRD-PARTY-SERVICES.md) for accounts, DNS records and what
breaks if each service goes away, [EMAIL.md](EMAIL.md) for the email flow, and
[SEO.md](SEO.md) for Google.

## Request flow — booking form

1. User fills the form. `submitBooking` in `src/App.jsx` checks name, phone, email, then
   `POST`s JSON to `API_URL/bookings`.
   `API_URL` = `VITE_API_URL` (build-time) → else `http://localhost:8787` in dev →
   else `https://api.luxepupsutah.com`.
2. The browser sends a CORS preflight (`OPTIONS`). The Worker answers only for origins in
   `ALLOWED_ORIGINS`.
3. The Worker, in order:
   1. rejects any origin not on the allowlist (`403`)
   2. rate limits per client IP: 5 requests / 60 s (`429`)
   3. rejects bodies over 8 KB (`413`) and invalid JSON (`400`)
   4. honeypot: if hidden field `website` is filled, returns fake success and sends nothing
   5. trims and length-limits every field; requires name, phone, valid email (`400`)
   6. emails the **owner** (must succeed, else `502`); `Reply-To` is the customer
   7. emails the **customer** a confirmation in the background (failure only logged)
   8. returns `201 {ok:true}`
4. The site shows "Request received" or an error with the phone number to call.

**Nothing is stored.** The owner's email is the only record of a booking. Deleting it loses it.

## Security model

- The Resend API key exists only as an encrypted Worker secret (`RESEND_API_KEY`). Never in
  the repo, the frontend bundle, or `wrangler.toml`.
- Anything in `src/` or a `VITE_*` variable is public. Never put secrets there.
- All user text is HTML-escaped before going into email; subject lines strip newlines
  (no header injection).
- The Worker can only send mail to the owner and to the address the customer typed, and the
  customer email is fixed-template, so it can't be used as a general spam relay. The rate
  limit and honeypot reduce abuse further.
- CORS allowlist is a browser protection, not authentication — a script can still call the
  API with a forged `Origin`. The rate limit is the real throttle.

## Environments

| | Site | API | Email |
|---|---|---|---|
| Local | `npm run dev` → :5173 | `cd worker && npm run dev` → :8787 (secret in `worker/.dev.vars`) | real sends via Resend unless you use a test key |
| Production | https://luxepupsutah.com | https://api.luxepupsutah.com | Resend, from `noreply@luxepupsutah.com` |

## Deploying

- **Site:** push to `main`. GitHub Actions builds with `VITE_API_URL` (repo *variable*) and
  publishes to Pages (~1 min).
- **Worker:** manual — `cd worker && npx wrangler deploy`. Not tied to git pushes. Config
  lives in `worker/wrangler.toml` (route `api.luxepupsutah.com`, vars, rate limiter).
  Deploy sets the custom-domain DNS record for you. Dashboard edits to vars get overwritten.
- **Secret:** `cd worker && npx wrangler secret put RESEND_API_KEY`.

## Known gaps / next steps

- No booking storage or admin view (email only). Next step if needed: Cloudflare D1/KV.
- No CAPTCHA (Cloudflare Turnstile would be the free add-on) — rate limit + honeypot only.
- No DMARC record yet (see THIRD-PARTY-SERVICES.md).
- `ALLOWED_ORIGINS` includes `http://localhost:5173` for dev; remove it for a stricter prod.
- Archived plans for a .NET + Postgres back office are in [archive/](archive/) (not built).

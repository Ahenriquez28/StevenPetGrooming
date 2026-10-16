# Third-party services

Every external thing this site depends on. Account owner for all is the business owner
(Cloudflare account email: ahenriquez200528@gmail.com).

| Service | Used for | Where to manage | Cost | If it goes away |
|---|---|---|---|---|
| **Porkbun** | Domain registration for `luxepupsutah.com` (renews 2027-06-11); legacy email forwarding MX | porkbun.com → Domain Management | ~$12/yr | Domain expires → site, email and API all die. Keep auto-renew + 2FA on |
| **Cloudflare** | DNS (nameservers `lola` / `renan` `.ns.cloudflare.com`), proxy/TLS for the site, Worker hosting, rate limiter | dash.cloudflare.com | Free plan | Site and API go down; repoint nameservers at Porkbun to fall back |
| **GitHub** | Source repo `Ahenriquez28/StevenPetGrooming`, GitHub Pages hosting, Actions build | github.com | Free | Site stops updating / serving |
| **Resend** | Sending booking + confirmation emails | resend.com | Free tier (check current daily/monthly caps) | Form returns 502; no bookings arrive |
| **Google Fonts** | Playfair Display + DM Sans, loaded from the browser | `index.html` | Free | Falls back to system fonts |
| **Google Search Console** | Search indexing and performance | search.google.com/search-console | Free | None for the site itself |

## DNS records (Cloudflare → luxepupsutah.com → DNS)

| Type | Name | Value | Proxy | Purpose |
|---|---|---|---|---|
| A ×4 | `@` | 185.199.108.153, .109.153, .110.153, .111.153 | Proxied | GitHub Pages |
| CNAME | `www` | ahenriquez28.github.io | Proxied | GitHub Pages |
| CNAME/Worker | `api` | managed by `wrangler deploy` (custom domain) | Proxied | Booking API |
| MX | `@` | fwd1.porkbun.com (10), fwd2.porkbun.com (20) | DNS only | Porkbun email forwarding (inbound `@luxepupsutah.com`) |
| TXT | `@` | `v=spf1 include:_spf.porkbun.com ~all` | DNS only | SPF for the apex |
| TXT | `_acme-challenge` ×2 | (certificate validation tokens) | DNS only | Leftover; harmless |
| TXT, MX | `resend._domainkey`, `send` | added by Resend | DNS only | Resend DKIM/SPF/bounces |
| TXT | `@` / `_google…` | Google Search Console verification, if you used the DNS method | DNS only | Ownership proof |

Rule: **email records must be DNS only (grey cloud)**. Only the web records are proxied.
Cloudflare SSL/TLS mode must be **Full** (Flexible causes redirect loops with GitHub Pages).

Recommended addition — DMARC (improves deliverability, reports spoofing). Add TXT
`_dmarc` = `v=DMARC1; p=none; rua=mailto:Luxepupsut@gmail.com`.

## Secrets and where they live

| Secret | Lives in | Never in |
|---|---|---|
| `RESEND_API_KEY` | Cloudflare Worker secret (and `worker/.dev.vars` locally) | git, frontend, `wrangler.toml`, chat |
| Cloudflare login (wrangler OAuth token) | `~/Library/Preferences/.wrangler/` on the dev machine | git |
| `VITE_API_URL` | GitHub repo **variable** (public value, not a secret) | — |

## Common tasks

| I want to… | Do this |
|---|---|
| Change who receives bookings | edit `OWNER_EMAIL` in `worker/wrangler.toml`, `npx wrangler deploy` |
| Rotate the Resend key | new key in Resend → `npx wrangler secret put RESEND_API_KEY` → delete old key |
| Publish a site change | push to `main` |
| Add a new allowed site origin | add to `ALLOWED_ORIGINS`, redeploy Worker |
| See Worker errors live | `cd worker && npx wrangler tail` |
| Move away from Cloudflare | set Porkbun nameservers back to Porkbun's defaults, recreate the records above |

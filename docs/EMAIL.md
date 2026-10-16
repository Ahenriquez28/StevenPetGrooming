# Email

All email goes through **plain SMTP** (MailKit) — no SendGrid/Mailgun/API keys.
Implementation: `backend/LuxePups.Api/Services/EmailService.cs`.

## What sends email

1. **Booking submitted** (public form):
   - notification to the business (`Smtp__OwnerNotificationEmail`) with all form fields
   - confirmation to the customer ("We got your request, we'll reach out to confirm")
   - both are fire-and-forget: an SMTP failure is logged but never fails the booking API call
2. **Mass campaigns** (admin → Email tab): one individual message per recipient
   (recipient's own address in `To:` — never a giant BCC), per-recipient try/catch so one
   bad address doesn't kill the batch. Results recorded on the EmailCampaign row.

## Configuration (env vars)

| Env var | Dev default (docker-compose) | Production |
|---|---|---|
| `Smtp__Host` | `mailpit` | your mail provider's SMTP host |
| `Smtp__Port` | `1025` | usually `587` |
| `Smtp__User` / `Smtp__Password` | empty (Mailpit needs none) | mailbox credentials |
| `Smtp__UseStartTls` | `false` | `true` |
| `Smtp__FromAddress` | `noreply@luxepupsutah.com` | same |
| `Smtp__FromName` | `Luxe Pups Grooming` | same |
| `Smtp__OwnerNotificationEmail` | `Luxepupsut@gmail.com` | the owner's real inbox |

## Local dev — Mailpit

`docker compose up` starts [Mailpit](https://mailpit.axllent.org/): a fake SMTP server that
catches everything. Open **http://localhost:8025** to see every email the app "sent".
Nothing ever leaves your machine in dev.

## Production — getting SMTP for luxepupsutah.com

Owning the domain isn't enough by itself — you need a mailbox/SMTP service for it.
Cheapest paths (any of these gives you the 4 values above):

- **Zoho Mail** free tier (custom domain, SMTP included)
- Your domain registrar's email offering (Namecheap/GoDaddy/Squarespace all sell one)
- **Google Workspace** (~$7/user/mo) if he wants Gmail for the business anyway

You'll add a few DNS records (MX, SPF, DKIM) at the registrar — the provider walks you
through it. Set SPF/DKIM or mass emails will land in spam.

**Deliverability note:** this sends one SMTP message per recipient with a small delay
between sends. Fine for a small-business list (dozens–hundreds). If the list ever grows
into thousands, revisit (dedicated sending service or queue).

## Production path: Cloudflare Worker + Resend (no server)

The live site has no backend. `worker/` is a Cloudflare Worker at `api.luxepupsutah.com`
that handles `POST /bookings` and sends both emails through Resend's HTTP API.

- Security: origin allowlist (`ALLOWED_ORIGINS`), honeypot field, 8 KB body cap, field length
  limits, HTML escaping, per-IP rate limit (5/min), API key only in Worker secrets.
- Owner notification goes to `OWNER_EMAIL` (Luxepupsut@gmail.com) with `Reply-To` = customer.

One-time setup:
1. Resend: add `luxepupsutah.com` as a domain, add the DNS records it lists in Cloudflare DNS
   (they live on a `send.` subdomain, so Porkbun's apex SPF/MX stay untouched), wait for Verified.
2. Create a Resend API key, then `cd worker && npm install && npx wrangler secret put RESEND_API_KEY`.
3. `npx wrangler deploy` (also creates the `api.luxepupsutah.com` DNS record).
4. GitHub repo variable `VITE_API_URL=https://api.luxepupsutah.com`, then redeploy the site.
Local: copy `worker/.dev.vars.example` to `worker/.dev.vars`, run `npm run dev` in `worker/`.

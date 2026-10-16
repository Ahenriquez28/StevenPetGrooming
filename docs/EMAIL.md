# Email

All mail is sent by the Cloudflare Worker through **Resend's HTTP API**
(`worker/src/index.js`). No SMTP, no mail server.

## What sends

On each valid `POST /bookings`:

| Email | To | Reply-To | Required to succeed? |
|---|---|---|---|
| "New booking request: {name} ({dog})" with all form fields | `OWNER_EMAIL` (Luxepupsut@gmail.com) | the customer | **Yes** — failure returns `502` and the site shows an error |
| "We got your request — Luxe Pups Grooming" | the customer | `OWNER_EMAIL` | No — best effort, failure is logged |

Both are sent from `Luxe Pups Grooming <noreply@luxepupsutah.com>`. `noreply@` cannot receive
mail, which is why `Reply-To` is always set.

## Configuration

| Setting | Where | Value |
|---|---|---|
| `OWNER_EMAIL`, `OWNER_PHONE`, `FROM_NAME`, `FROM_ADDRESS`, `ALLOWED_ORIGINS` | `worker/wrangler.toml` `[vars]` | non-secret; redeploy after editing |
| `RESEND_API_KEY` | Cloudflare Worker secret | `npx wrangler secret put RESEND_API_KEY` |
| Local secret | `worker/.dev.vars` (git-ignored) | copy from `.dev.vars.example` |

To change who gets booking notifications: edit `OWNER_EMAIL`, then `npx wrangler deploy`.

## Resend setup (one time, done)

- Domain `luxepupsutah.com` added in Resend and verified through Cloudflare DNS
  (DKIM TXT on `resend._domainkey`, plus MX/SPF on the `send.` subdomain).
- These are all **DNS only** (grey cloud) in Cloudflare. They do not touch the apex MX/SPF
  records that Porkbun email forwarding uses.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Form shows "We could not send your request" (502) | Resend rejected the send: domain not verified, bad/rotated API key, or Resend quota hit. Check the Resend dashboard → Logs, and `npx wrangler tail` while resubmitting |
| Form shows "Origin not allowed" (403) | Site served from an origin missing in `ALLOWED_ORIGINS` |
| "Too many requests" (429) | Same IP sent >5 in a minute |
| Owner got it, customer didn't | Typo'd address, or it's in spam; confirmation is best-effort |
| Mail lands in spam | Add a DMARC record; check SPF/DKIM pass in Gmail → Show original |

Rotating the key: create a new key in Resend, run the `secret put` command, delete the old key.

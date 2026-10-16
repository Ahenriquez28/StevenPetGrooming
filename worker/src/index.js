// Luxe Pups booking API — Cloudflare Worker. Receives the homepage form and sends
// two emails through Resend's HTTP API. The Resend key lives only in the Worker's
// secrets (RESEND_API_KEY), never in the frontend or the repo.

const MAX_BODY_BYTES = 8 * 1024
const LIMITS = { name: 100, phone: 30, email: 254, address: 200, dogName: 60, dogBreed: 60, service: 80, preferredDate: 10, notes: 1000 }

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim()

function corsHeaders(request, env) {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean)
  const origin = request.headers.get('Origin')
  const headers = { Vary: 'Origin' }
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
    headers['Access-Control-Max-Age'] = '86400'
  }
  return headers
}

const json = (status, body, extra) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...extra } })

async function sendEmail(env, { to, subject, html, replyTo }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `${env.FROM_NAME} <${env.FROM_ADDRESS}>`,
      to: [to],
      subject,
      html,
      reply_to: replyTo,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}`)
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request, env)
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (url.pathname !== '/bookings' || request.method !== 'POST') return json(404, { error: 'Not found.' }, cors)

    // Browsers always send Origin on cross-origin POSTs; reject anything not from our site.
    if (!cors['Access-Control-Allow-Origin']) return json(403, { error: 'Origin not allowed.' }, cors)

    // Throttle per client IP so the form can't be used to spam the owner or burn Resend quota.
    if (env.BOOKING_LIMITER) {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
      const { success } = await env.BOOKING_LIMITER.limit({ key: ip })
      if (!success) return json(429, { error: 'Too many requests. Please wait a minute and try again.' }, cors)
    }

    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json(413, { error: 'Request too large.' }, cors)

    let data
    try {
      data = JSON.parse(raw)
    } catch {
      return json(400, { error: 'Invalid request.' }, cors)
    }
    if (typeof data !== 'object' || data === null) return json(400, { error: 'Invalid request.' }, cors)

    // Honeypot: real users never fill this hidden field. Pretend success so bots learn nothing.
    if (data.website) return json(201, { ok: true }, cors)

    const f = {}
    for (const [key, max] of Object.entries(LIMITS)) {
      const v = data[key]
      f[key] = typeof v === 'string' ? v.trim().slice(0, max) : ''
    }
    if (!f.name) return json(400, { error: 'Name is required.' }, cors)
    if (!f.phone) return json(400, { error: 'Phone is required.' }, cors)
    if (!/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(f.email)) return json(400, { error: 'A valid email is required.' }, cors)
    f.email = f.email.toLowerCase()

    const rows = [
      ['Name', f.name], ['Phone', f.phone], ['Email', f.email], ['Address', f.address],
      ['Dog', [f.dogName, f.dogBreed].filter(Boolean).join(' — ')],
      ['Service', f.service], ['Preferred date', f.preferredDate], ['Notes', f.notes],
    ].filter(([, v]) => v)
    const table = rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('')

    // 1) Notification to the owner — this one must succeed. Reply goes straight to the customer.
    try {
      await sendEmail(env, {
        to: env.OWNER_EMAIL,
        subject: `New booking request: ${oneLine(f.name)}${f.dogName ? ` (${oneLine(f.dogName)})` : ''}`,
        html: `<p>A new booking request came in from the website.</p><table>${table}</table><p>Reply to this email to reach the customer.</p>`,
        replyTo: f.email,
      })
    } catch (err) {
      console.error('Owner notification failed', err.message)
      return json(502, { error: 'We could not send your request.' }, cors)
    }

    // 2) Confirmation to the customer — best effort. Their replies come to the owner.
    ctx.waitUntil(
      sendEmail(env, {
        to: f.email,
        subject: 'We got your request — Luxe Pups Grooming',
        html: `<p>Hi ${esc(f.name)},</p><p>Thanks for requesting an appointment${f.dogName ? ` for ${esc(f.dogName)}` : ''}! We'll reach out shortly to confirm your time and the $40 deposit.</p><p>You can reply to this email or call ${esc(env.OWNER_PHONE)}.</p><p>— Luxe Pups Grooming</p>`,
        replyTo: env.OWNER_EMAIL,
      }).catch((err) => console.error('Customer confirmation failed', err.message)),
    )

    return json(201, { ok: true }, cors)
  },
}

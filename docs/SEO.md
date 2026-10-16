# SEO / Google

## What's in place

- `index.html`: title, meta description, canonical URL, Open Graph/Twitter tags, and
  `LocalBusiness` JSON-LD (name, phone, hours, area served Utah).
- `public/robots.txt` (allows all, points to the sitemap) and `public/sitemap.xml`.
- Favicon set: `favicon.svg`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192/512.png`,
  `site.webmanifest`. Google shows the favicon in results (needs a multiple of 48px — met).

## Getting on Google (Search Console)

1. Go to https://search.google.com/search-console → **Add property** → **Domain** →
   `luxepupsutah.com`.
2. Verify with the **DNS TXT** method (recommended — no file needed; Cloudflare is the DNS):
   copy the `google-site-verification=…` value → Cloudflare → DNS → Add record → TXT, name
   `@`, paste value, **DNS only** → back in Search Console click Verify.
   - *Alternative, the HTML file method:* choose **URL prefix** →
     `https://luxepupsutah.com/`, download the `googleXXXXXXXX.html` file, put it in `public/`
     (don't edit it), push, then click Verify.
3. **Sitemaps** (left menu) → enter `sitemap.xml` → Submit.
4. **URL Inspection** → paste `https://luxepupsutah.com/` → **Request indexing**.
5. Indexing normally takes days to a few weeks; there is no instant listing.

## Local ranking (matters most for a service business)

- Create a free **Google Business Profile** (business.google.com) as a service-area business
  covering your Utah cities, with the same name/phone as the site. This drives "dog groomer
  near me" results far more than the website alone.
- Add real review links, photos, and the site URL to the profile.

## Limits to know

- The site is a single URL. "About" is a state switch, not a page, so it can't rank on its
  own. If SEO matters, add real routes/pages (e.g. per city or service) — GitHub Pages
  would need pre-rendered pages or a `404.html` SPA fallback.
- Content is client-rendered React; Google handles it, but headings and copy in `App.jsx`
  should name the services and cities you serve ("mobile dog grooming in {city}, Utah").
- Re-check the JSON-LD against real details (hours, phone, service area) before relying on it.

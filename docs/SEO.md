# SEO / Google

## What's in place

- `index.html`: title, meta description, canonical URL, Open Graph/Twitter tags, and
  `LocalBusiness` JSON-LD (name, phone, hours, and every county and town served).
- **Service areas live in one file: `src/serviceAreas.js`** (counties + towns, plus the phone number).
  It feeds the on-page "Service Areas" section, and `vite.config.js` injects the same list into the
  JSON-LD and the `keywords` meta tag at build time. Edit that file to add or remove a county or town.
- Google ignores the `keywords` meta tag. What actually helps: the visible town/county text,
  the page title and description, the JSON-LD, and a Google Business Profile listing the same areas.
- `public/robots.txt` (allows all, points to the sitemap) and `public/sitemap.xml`.
- Favicon set: `favicon.svg`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192/512.png`,
  `site.webmanifest`. Google shows the favicon in results (needs a multiple of 48px — met).

- **Every page is written out as real HTML at build time** (`npm run build` = browser build, then a
  server copy of the same app, then `scripts/prerender.mjs`). So `/services/`, `/davis-county/` etc.
  each have their own title, description, canonical and full text in the HTML, not an empty shell.
  If you add a page: add it to `src/routes.js` (and `src/App.jsx`) and to `public/sitemap.xml`.
- **County pages** (`/davis-county/`, `/weber-county/`, `/morgan-county/`, `/salt-lake-county/`): copy in
  `src/countyCopy.js`, towns from `src/serviceAreas.js`, template in `src/pages/County.jsx`.
- Canonical URLs and sitemap entries use a trailing slash (`/services/`) because that is how GitHub
  Pages serves folders.
- Hero photos and the logo mark are served as small WebP files (`MainDog.webp`, `LogoMark.webp`, ...).
  The original PNGs stay in `public/` (the social-share image and structured data still use them).

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

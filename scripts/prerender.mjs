// Build step 3 of 3: write the real HTML for every page.
// `vite build` makes the browser app, `vite build --ssr` makes a server copy of the same app,
// and this script renders each route to HTML with its own title/description/canonical.
// Result: Google (and anyone with scripts off) sees the full page text, not an empty shell.
// In the browser, React then takes over the existing HTML without redrawing it.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROUTES, SITE } from '../src/routes.js'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('prerender: root placeholder not found in dist/index.html')

const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

for (const r of ROUTES) {
  // GitHub Pages serves folders with a trailing slash (/services/), so the canonical matches that
  const url = r.path === '/' ? `${SITE}/` : `${SITE}${r.path}/`
  const html = template
    .replace('<div id="root"></div>', () => `<div id="root">${render(r.path)}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(r.title)}</title>`)
    .replace(/(name="description" content=")[^"]*"/, (_, a) => `${a}${esc(r.description)}"`)
    .replace(/(property="og:title" content=")[^"]*"/, (_, a) => `${a}${esc(r.title)}"`)
    .replace(/(property="og:description" content=")[^"]*"/, (_, a) => `${a}${esc(r.description)}"`)
    .replace(/(rel="canonical" href=")[^"]*"/, (_, a) => `${a}${url}"`)
    .replace(/(property="og:url" content=")[^"]*"/, (_, a) => `${a}${url}"`)
  const out = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log(`prerendered ${r.path}  (${Math.round(html.length / 1024)} KB)`)
}

// Unknown URLs: GitHub Pages serves 404.html; the app starts empty and routes in the browser.
fs.writeFileSync(path.join(dist, '404.html'), template)
fs.rmSync(ssrDir, { recursive: true, force: true })

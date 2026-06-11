# Luxe Pups Grooming

Marketing site + booking landing page for Luxe Pups Grooming (luxepupsutah.com).
Built with **Vite + React**. The current homepage is a temporary landing page;
new pages and functionality will be added over time.

## Local development
```bash
npm install        # first time only
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## Project structure
- `index.html` — Vite entry (page shell, fonts, meta). Not your content.
- `src/App.jsx` — the temporary landing page (the homepage you see).
- `src/index.css` — all styles.
- `public/CNAME` — custom domain for GitHub Pages (luxepupsutah.com). Don't remove.
- `public/` — static assets served at the site root (drop `logo.png` here).
- `.github/workflows/deploy.yml` — auto-builds and deploys to GitHub Pages on push to `main`.

## Logo
A text wordmark is used as a placeholder. To use the real logo, add the image at
`public/logo.png` and swap the `<Wordmark />` tags in `src/App.jsx` for `<img>` tags
(instructions are in the comment at the top of that file).

## Deployment
Pushing to `main` triggers the GitHub Actions workflow, which builds the site and
publishes `dist/` to GitHub Pages. In the repo: **Settings → Pages → Build and
deployment → Source: GitHub Actions.**

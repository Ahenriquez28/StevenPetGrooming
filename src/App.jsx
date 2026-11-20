import { useEffect, useState } from 'react'
import { Link } from './router'
import { PawTrail } from './components/ui'
import { useRouter } from './routerContext'
import { ROUTES } from './routes'
import { HOURS, PHONE_DISPLAY, PHONE_TEL } from './serviceAreas'
import { prefersReducedMotion } from './utils'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Areas from './pages/Areas'
import Book from './pages/Book'
import County from './pages/County'
import { COUNTY_PAGES } from './countyCopy'

const PAGES = { '/': Home, '/services': Services, '/about': About, '/areas': Areas, '/book': Book }
const NAV = [
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/areas', 'Areas'],
]

export default function App() {
  const { path } = useRouter()
  // menu state is tied to the page it was opened on, so navigating closes it without an effect
  const [menu, setMenu] = useState({ open: false, path })
  const menuOpen = menu.open && menu.path === path
  const setMenuOpen = (fn) => setMenu({ open: fn(menuOpen), path })
  const county = COUNTY_PAGES.find((c) => `/${c.slug}` === path)
  const Page = PAGES[path] || Home

  // keep the tab title in step with the URL (the build also writes a static copy per route)
  useEffect(() => {
    const r = ROUTES.find((x) => x.path === path)
    if (r) document.title = r.title
  }, [path])

  // Scroll-reveal: content is always visible unless JS + IntersectionObserver
  // are available and the visitor hasn't asked for reduced motion.
  useEffect(() => {
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) return
    document.documentElement.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-nav">
        <Link to="/" className="brand" aria-label="Luxe Pups Grooming — home">
          <img src="/LogoMark.webp" alt="" className="brand-img" width="68" height="68" />
          <span className="brand-text" aria-hidden="true">
            <span className="brand-name">Luxe Pups</span>
            <span className="brand-sub">Grooming</span>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle-bars" aria-hidden="true" />
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
        <nav id="nav-links" className={menuOpen ? 'open' : ''} aria-label="Primary">
          <ul>
            {NAV.map(([to, label]) => (
              <li key={to}><Link to={to} aria-current={path === to ? 'page' : undefined}>{label}</Link></li>
            ))}
            <li><Link to="/book" className="nav-cta">Book Now</Link></li>
          </ul>
        </nav>
      </header>

      <main id="main">
        {county ? <County slug={county.slug} /> : <Page />}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <PawTrail light className="paw-trail--br" />
          <div className="footer-brand">
            <img src="/LogoMark.webp" alt="Luxe Pups Grooming" className="footer-logo" width="120" height="120" loading="lazy" />
            <p className="footer-tagline">Utah In-home Mobile Dog Groomer</p>
            <p className="footer-desc">Luxe Pups is a mobile in-home dog and pet grooming service serving Davis County and surrounding Utah counties. We are small dog breed specialists.</p>
            <a href={`tel:${PHONE_TEL}`} className="footer-phone">{PHONE_DISPLAY}</a>
          </div>

          <div className="footer-col">
            <h4>Hours of Operation</h4>
            <ul className="footer-hours">
              {HOURS.map((h) => (
                <li key={h.label}>
                  <span>{h.label}</span>
                  <span>{h.closed ? 'Closed' : h.text}</span>
                </li>
              ))}
            </ul>
            <p className="footer-area">Serving Davis, Weber, Morgan and Salt Lake counties.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Luxe Pups Grooming. All rights reserved.</p>
          <nav aria-label="Footer" className="footer-links">
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/areas">Areas</Link>
            <Link to="/book">Book</Link>
          </nav>
        </div>
      </footer>

      <div className="mobile-bar">
        <a href={`tel:${PHONE_TEL}`} className="mobile-bar-call">Call</a>
        <Link to="/book" className="mobile-bar-book">Book Now</Link>
      </div>
    </>
  )
}

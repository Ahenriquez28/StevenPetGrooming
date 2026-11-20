import { useSyncExternalStore } from 'react'
import { isDesktop } from '../utils'

export function Paw({ size = 16 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" aria-hidden="true">
      <ellipse cx="50" cy="65" rx="25" ry="22" />
      <ellipse cx="28" cy="42" rx="9" ry="11" />
      <ellipse cx="44" cy="36" rx="9" ry="11" />
      <ellipse cx="60" cy="36" rx="9" ry="11" />
      <ellipse cx="74" cy="42" rx="9" ry="11" />
    </svg>
  )
}

const PAW_PATH = (
  <>
    <ellipse cx="50" cy="65" rx="25" ry="22" />
    <ellipse cx="28" cy="42" rx="9" ry="11" />
    <ellipse cx="44" cy="36" rx="9" ry="11" />
    <ellipse cx="60" cy="36" rx="9" ry="11" />
    <ellipse cx="74" cy="42" rx="9" ry="11" />
  </>
)

// Faint decorative paw-print trail for empty corners. Position it with a modifier class
// (paw-trail--tr / --bl / --br) inside a parent that has position: relative.
export function PawTrail({ className = '', light = false }) {
  return (
    <svg className={`paw-trail${light ? ' paw-trail--light' : ''} ${className}`} viewBox="0 0 220 220" fill="currentColor" aria-hidden="true">
      <g transform="translate(8 128) rotate(-20) scale(.48)">{PAW_PATH}</g>
      <g transform="translate(70 76) rotate(-8) scale(.42)">{PAW_PATH}</g>
      <g transform="translate(118 138) rotate(-24) scale(.45)">{PAW_PATH}</g>
      <g transform="translate(170 62) rotate(-12) scale(.38)">{PAW_PATH}</g>
    </svg>
  )
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

// Collapsible block: open on desktop by default, closed on phones so the page stays short.
export function Fold({ title, meta, dark = false, className = '', children }) {
  // false on the server / first paint, then the real value once the page is live in the browser
  const open = useSyncExternalStore(() => () => {}, isDesktop, () => false)
  return (
    <details className={`fold${dark ? ' fold--dark' : ''} ${className}`} open={open}>
      <summary>
        <span className="fold-title">{title}</span>
        {meta && <span className="fold-meta">{meta}</span>}
        <span className="fold-icon" aria-hidden="true" />
      </summary>
      <div className="fold-body">{children}</div>
    </details>
  )
}

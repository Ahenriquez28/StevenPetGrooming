import { useCallback, useEffect, useMemo, useState } from 'react'
import { ROUTES } from './routes'
import { RouterCtx, useRouter } from './routerContext'

// Tiny History-API router (no dependency). Each route is a real URL, e.g. /services.

const normalize = (p) => {
  const clean = (p || '/').replace(/\/+$/, '') || '/'
  return ROUTES.some((r) => r.path === clean) ? clean : '/'
}

export function RouterProvider({ children, initialPath }) {
  const [path, setPath] = useState(() => normalize(initialPath ?? window.location.pathname))

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to) => {
    const next = normalize(to)
    const current = window.location.pathname.replace(/\/+$/, '') || '/'
    if (current !== next) window.history.pushState({}, '', next)
    setPath(next)
    window.scrollTo(0, 0)
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])
  return <RouterCtx.Provider value={value}>{children}</RouterCtx.Provider>
}

export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRouter()
  return (
    <a
      href={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}

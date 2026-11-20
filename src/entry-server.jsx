import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { RouterProvider } from './router'

// Used only at build time (scripts/prerender.mjs) to write each page's real HTML.
export function render(path) {
  return renderToString(
    <RouterProvider initialPath={path}>
      <App />
    </RouterProvider>,
  )
}

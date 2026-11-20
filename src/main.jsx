import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from './router'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>
)

// Built pages already contain the rendered HTML (good for Google); take it over without re-drawing.
// The dev server and the generic 404 page start empty, so render normally there.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

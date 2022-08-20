import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

import 'normalize.css/normalize.css'

const rootElement = document.getElementById('app')

if (!rootElement) {
  throw new Error('No root element found')
}

if (rootElement?.hasChildNodes()) {
  hydrateRoot(rootElement, <App />)
} else {
  createRoot(rootElement).render(<App />)
}

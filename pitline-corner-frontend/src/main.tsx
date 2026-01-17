import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  enableTracing: true,
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE ?? 'development',
  sendDefaultPii: true,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

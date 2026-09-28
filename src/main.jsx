import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

window.addEventListener('error', e => console.error('GLOBAL ERROR:', e.message)); window.addEventListener('unhandledrejection', e => console.error('UNHANDLED PROMISE:', e.reason));

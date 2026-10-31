import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.VITE_MEMORY_ROUTER ? <MemoryRouter><App /></MemoryRouter> : <BrowserRouter><App /></BrowserRouter>}
  </StrictMode>,
)

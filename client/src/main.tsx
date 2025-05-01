import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  // TODO PLZ remember to remove the 
  // StrictMode when we wanna see prod or we can just make prod/dev build
  <StrictMode> 
    <App />
  </StrictMode>,
)

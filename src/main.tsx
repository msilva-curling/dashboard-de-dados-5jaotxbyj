/* Main entry point for the application - renders the root React component */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'

// Load Skip monitoring script
loadSkipLib()

createRoot(document.getElementById('root')!).render(<App />)

function loadSkipLib() {
  // Only load if not already loaded
  if ((window as any).skipLibLoaded) {
    return
  }

  console.log('Skip: Starting to load monitoring script')

  const script = document.createElement('script')
  script.src = 'https://goskip.dev/skip.js?d=' + Math.round(Date.now() / 900000)
  script.async = true
  script.onload = () => {
    (window as any).skipLibLoaded = true
    console.log('Skip: Monitoring script loaded successfully')
  }
  script.onerror = (error) => {
    console.error('Skip: Failed to load monitoring script:', error)
    // Try fallback to localhost in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Skip: Trying localhost fallback')
      const fallbackScript = document.createElement('script')
      fallbackScript.src = 'http://localhost:3000/skip.js?d=' + Math.round(Date.now() / 900000)
      fallbackScript.async = true
      fallbackScript.onload = () => {
        (window as any).skipLibLoaded = true
        console.log('Skip: Monitoring script loaded from localhost fallback')
      }
      fallbackScript.onerror = () => {
        console.error('Skip: Both main and fallback script loading failed')
      }
      document.head.appendChild(fallbackScript)
    }
  }

  document.head.appendChild(script)
}

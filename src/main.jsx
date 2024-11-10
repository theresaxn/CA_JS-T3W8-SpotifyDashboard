import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeContextProvider } from './contexts/ThemeContextProvider.jsx'
import { SpotifyAuthProvider } from './contexts/SpotifyAuthProvider.jsx'
import { SpofileProfileProvider } from './contexts/SpotifyProfileProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <SpotifyAuthProvider>
        <SpofileProfileProvider>
          <App />
        </SpofileProfileProvider>
      </SpotifyAuthProvider>
    </ThemeContextProvider>    
  </StrictMode>,
)

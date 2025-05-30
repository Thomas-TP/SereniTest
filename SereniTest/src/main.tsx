import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './components/ChatStyles.css' // Import chat styles
import './index.css'
import ThemeProviderWrapper from './components/ThemeProviderWrapper'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
  </React.StrictMode>,
)

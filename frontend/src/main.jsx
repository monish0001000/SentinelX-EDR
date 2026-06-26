import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Toaster position="bottom-right" toastOptions={{ 
        className: 'glass-panel text-textMain',
        style: { background: 'var(--color-surface)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }
      }} />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

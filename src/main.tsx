import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthContextProvider from './context/AuthContextProvider'
import ThemeContextProvider from './context/ThemeContextProvider'
import './index.css'
import './services/firebase'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

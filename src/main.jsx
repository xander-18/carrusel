import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
<StrictMode>
    <App />
  </StrictMode>
  </CartProvider>
)

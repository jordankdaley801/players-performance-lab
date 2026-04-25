import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './styles/global.css'
import {CartProvider} from './context/CartContext'
import {MemberProvider} from './context/MemberContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MemberProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </MemberProvider>
    </BrowserRouter>
  </StrictMode>,
)

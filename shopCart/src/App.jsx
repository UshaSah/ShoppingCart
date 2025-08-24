import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="App">
      <nav className='navbar'>
        <div className='nav-container'>
          <div className='nav-brand'>
            <span className='nav-logo'>🛍️ ShopCart</span>
          </div>

          <div className='nav-links'>
            <a href="/" className='nav-link active'>Home</a>
            <a href="/shop" className='nav-link'>Shop</a>
          </div>


          <div className="nav-cart">
            <div className="cart-info">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{count}</span>
              <span className="cart-label">items</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <HomePage />
      </main>
    </div>
  )
}

export default App

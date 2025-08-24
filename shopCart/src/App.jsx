import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage cartCount={count} />} />
          <Route path="/shop" element={<ShopPage cartCount={count} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

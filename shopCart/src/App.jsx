import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import FetchGetRequest from './components/Fetch'

function App() {
  const [count, setCount] = useState(0)

  // Function to receive cart count from Fetch component
  const handleCartCountUpdate = (cartCount) => {
    console.log('Cart count updated in App:', cartCount);
    setCount(cartCount);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage cartCount={count} />} />
          <Route path="/shop" element={<ShopPage cartCount={count} />} />
          <Route path="/test" element={<FetchGetRequest onCartCountUpdate={handleCartCountUpdate} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

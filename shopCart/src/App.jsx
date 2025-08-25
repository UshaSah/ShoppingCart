import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import FetchGetRequest from './components/Fetch'

function App() {
  const [count, setCount] = useState(0)
  const [cartData, setCartData] = useState(null)

  // Fetch cart data when app loads
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        console.log('App: Fetching cart data...');
        const response = await fetch('https://fakestoreapi.com/carts/1');

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        const data = await response.json();
        console.log('App: Cart data received:', data);

        // Calculate total number of products
        const countProduct = data.products.reduce((sum, product) => {
          return sum + product.quantity;
        }, 0);

        console.log('App: Total products calculated:', countProduct);
        setCount(countProduct);
        setCartData(data); // Store cart data for reuse
      } catch (err) {
        console.error('App: Error fetching cart data:', err);
        setCount(0);
      }
    };

    fetchCartData();
  }, []);

  // Function to receive cart count from Fetch component (for test page)
  const handleCartCountUpdate = (cartCount) => {
    console.log('Cart count updated in App:', cartCount);
    setCount(cartCount);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <HomePage cartCount={count} />
              <FetchGetRequest onCartCountUpdate={handleCartCountUpdate} />
            </>
          } />
          <Route path="/shop" element={<ShopPage cartCount={count} cartData={cartData} />} />
          <Route path="/test" element={<FetchGetRequest onCartCountUpdate={handleCartCountUpdate} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

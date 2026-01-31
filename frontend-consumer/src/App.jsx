import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Context Wrapper

// Components & Pages
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  // --- Cart State Management ---
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (book) => {
    // You can add logic here to check for duplicates if you want later
    setCart([...cart, { ...book }]);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Clear cart (Used after successful checkout)
  const clearCart = () => {
    setCart([]);
  };

  return (
    // 1. Wrap entire Router in AuthProvider so all pages know the User
    <AuthProvider>
      <Router>
        {/* 2. Navbar needs cartCount to show the number badge */}
        <Navbar cartCount={cart.length} />
        
        <div className="container mt-4">
          <Routes>
            {/* Home Page: Needs addToCart to buy books */}
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            
            {/* Cart Page: Needs cart data, remove function, and clear function */}
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cart={cart} 
                  removeFromCart={removeFromCart} 
                  clearCart={clearCart} 
                />
              } 
            />
            <Route path="/orders" element={<OrderHistoryPage />} />
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
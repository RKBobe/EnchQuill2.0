import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const CartPage = ({ cart, removeFromCart, clearCart }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  // 2. Checkout Handler
  const checkoutHandler = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // FIX: Format the cart items to match Backend Schema
      const formattedOrderItems = cart.map((item) => ({
        product: item._id,       // The ID of the book
        name: item.title,        // The title
        price: item.price,       // The price
        qty: 1,                  // Quantity (defaulting to 1 for now)
        // Note: We are NOT sending 'image' because the backend model should be optional now
      }));

      // Send Order to Backend
      await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: formattedOrderItems,
          shippingAddress: { 
             address: '123 Main St', 
             city: 'Deville', 
             postalCode: '71328', 
             country: 'USA' 
          },
          paymentMethod: 'PayPal',
          totalPrice: totalPrice,
        },
        config
      );

      // Success!
      alert('Order Placed Successfully! (Payment Simulated)');
      clearCart(); // Empty the cart
      navigate('/'); // Go back to store

    } catch (error) {
      // LOG THE FULL ERROR TO CONSOLE
      console.error("FULL ERROR DETAILS:", error.response);

      // SHOW THE REAL REASON IN THE ALERT
      const serverMessage = error.response?.data?.message || error.message;
      alert(`Checkout Failed: ${serverMessage}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn btn-primary mt-3">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <h2>Shopping Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title">{item.title}</h5>
                <p className="text-muted mb-0">${item.price}</p>
              </div>
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title">Order Summary</h4>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span className="h5">Total Price:</span>
              <span className="h5">${totalPrice}</span>
            </div>
            
            <button 
              className="btn btn-success w-100" 
              onClick={checkoutHandler}
              disabled={cart.length === 0}
            >
              Place Order
            </button>
            
            {!user && (
              <div className="alert alert-warning mt-3 text-center">
                Please <Link to="/login">login</Link> to checkout
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
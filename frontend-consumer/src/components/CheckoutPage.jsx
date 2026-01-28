import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = ({ cart, clearCart }) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const totalPrice = cart.reduce((total, item) => total + (item.price || 14.99) * item.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    // In a real application, you would handle the payment processing here.
    // For this simulation, we'll just set a state to show a success message.
    setIsPaymentSuccessful(true);
    clearCart();
  };

  if (isPaymentSuccessful) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Payment Successful!</h1>
        <p className="mb-8">Thank you for your purchase.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.title} (x{item.quantity})</span>
              <span>${((item.price || 14.99) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name on Card
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John Doe" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card">
              Card Number
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="card" type="text" placeholder="**** **** **** ****" required />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry">
                Expiry Date
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expiry" type="text" placeholder="MM/YY" required />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvc">
                CVC
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cvc" type="text" placeholder="123" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

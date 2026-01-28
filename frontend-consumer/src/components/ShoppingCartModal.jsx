import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- THIS WAS MISSING

const ShoppingCartModal = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity }) => {
  if (!isOpen) return null;

  const totalPrice = cart.reduce((total, item) => total + (item.price || 14.99) * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                    {/* Placeholder for book cover */}
                    <span className="text-xs text-gray-400">Cover</span>
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">${(item.price || 14.99).toFixed(2)}</p>
                    <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 hover:underline mt-1">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                    className="w-16 text-center border rounded p-1"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-auto pt-6 border-t">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={onClose}>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartModal;
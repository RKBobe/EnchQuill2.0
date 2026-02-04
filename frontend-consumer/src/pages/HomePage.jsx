import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Vite-specific environment variable for your MongoDB backend
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api/books';

const HomePage = ({ addToCart }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("MongoDB Connection Error:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    /* ROOT: Explicit opacity 1 and relative Z-index to clear the white haze */
    <div style={{ opacity: '1', backgroundColor: '#f8fafc', minHeight: '100vh', position: 'relative', zIndex: '1' }}>
      
      <main className="container mx-auto py-12 px-4" style={{ opacity: '1', position: 'relative', zIndex: '10' }}>
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 animate-pulse">Connecting to MongoDB...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {books.map((book) => (
              <div 
                key={book._id} 
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 flex flex-col"
                style={{ opacity: '1', zIndex: '20', position: 'relative' }}
              >
                <div className="p-6 flex flex-col flex-grow" style={{ backgroundColor: '#ffffff' }}>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">{book.title}</h3>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-blue-700 font-bold text-xl">${book.price}</p>
                    {/* Using 'quantity' from your bookController.js */}
                    <span className="text-sm font-medium text-gray-500">
                      In Stock: {book.quantity || 0}
                    </span>
                  </div>
                  
                  {/* BUTTON: Explicit color fix + Calling your WORKING addToCart prop */}
                  <button 
                    type="button"
                    className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all active:scale-95"
                    style={{ 
                      opacity: '1', 
                      backgroundColor: '#2563eb', 
                      zIndex: '50', 
                      position: 'relative', 
                      pointerEvents: 'auto',
                      cursor: 'pointer'
                    }}
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
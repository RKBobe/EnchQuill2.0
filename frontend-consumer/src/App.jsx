import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, BookOpen } from 'lucide-react';

const App = () => {
  // State for books, cart, and search
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch books from your Backend API
  useEffect(() => {
    // Note: Ensure your Backend (port 5000) has CORS enabled for port 5173
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  // Filter books based on search input
  const filteredBooks = books.filter(book => 
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      
      {/* --- NAVIGATION --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold tracking-tight">Enchanted Quill</span>
            </div>
            
            {/* Search & Cart */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search titles..."
                  className="pl-10 pr-4 py-2 border rounded-full bg-stone-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              
              <button className="relative p-2 hover:bg-stone-100 rounded-full transition">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="bg-indigo-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight">
            Find Your Next Adventure
          </h1>
          <p className="mt-4 text-xl text-indigo-200 max-w-2xl mx-auto">
            Browse our curated collection of magical tales, technical manuals, and ancient scrolls.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading the library...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div key={book._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
                {/* Fallback Cover Image */}
                <div className="h-48 bg-stone-200 flex items-center justify-center relative">
                  <BookOpen className="h-12 w-12 text-stone-400" />
                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {book.category || "Fiction"}
                  </span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-indigo-600 font-medium mb-2">{book.author}</p>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {book.description || "No description available for this title."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-gray-900">
                      ${book.price ? book.price : "14.99"}
                    </span>
                    <button 
                      onClick={() => addToCart(book)}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition shadow-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">No books found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ addToCart }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError('Failed to load books. Is the backend running?');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Library...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="row">
      <h1 className="text-center mb-4">The Enchanted Collection</h1>
      {books.map((book) => (
        <div key={book._id} className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            {/* If you have image URLs, use them. Otherwise, use a placeholder */}
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{book.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
              <p className="card-text text-truncate">{book.description}</p>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                <span className="h5 mb-0">${book.price}</span>
                <button 
                  className="btn btn-primary"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
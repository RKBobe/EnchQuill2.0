import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookManagementPage = () => {
  const [formData, setFormData] = useState({
    bookID: '', isbn: '', title: '', author: '', price: '', quantity: 1, category: 'General'
  });
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // --- 1. Logout ---
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // --- 2. Fetch Books (Refresh) ---
  const fetchBooks = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { 
        headers: { Authorization: `Bearer ${userInfo.token}` } 
      };
      const { data } = await axios.get('http://localhost:5000/api/books', config);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // --- 3. Input Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { 
        headers: { Authorization: `Bearer ${userInfo.token}` } 
      };
      await axios.post('http://localhost:5000/api/books', formData, config);
      alert('Book Added Successfully!');
      // Reset form
      setFormData({ bookID: '', isbn: '', title: '', author: '', price: '', quantity: 1, category: 'General' });
      fetchBooks(); 
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding book');
    }
  };

  // --- 4. Delete Logic ---
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { 
          headers: { Authorization: `Bearer ${userInfo.token}` } 
        };
        await axios.delete(`http://localhost:5000/api/books/${id}`, config);
        alert('Book deleted!');
        fetchBooks(); 
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting book');
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-black">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Enchanted Quill Admin</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Book Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-full text-xl font-semibold border-b pb-2 mb-2">Add New Book</div>
        <input name="bookID" placeholder="Book ID (e.g. B-101)" value={formData.bookID} onChange={handleChange} className="border p-2 rounded" required />
        <input name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} className="border p-2 rounded" required />
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 rounded" required />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="border p-2 rounded" required />
        <input name="price" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded" required />
        <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="border p-2 rounded" required />
        <button className="col-span-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition" type="submit">
          Add Book to Inventory
        </button>
      </form>

      {/* Inventory List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Current Inventory</h2>
          <button 
            onClick={fetchBooks} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <span>🔄</span> Refresh List
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Author</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Stock</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border font-mono text-sm">{book.bookID}</td>
                  <td className="p-3 border">{book.title}</td>
                  <td className="p-3 border">{book.author}</td>
                  <td className="p-3 border">${book.price}</td>
                  <td className="p-3 border">{book.quantity}</td>
                  <td className="p-3 border text-center">
                    <button 
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">No books found in inventory.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookManagementPage;
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import BookTable from './BookTable';
import BookSearchBar from './BookSearchBar';
import BookFormModal from './BookFormModal';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // null = adding new, object = editing

  // Initial Load
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (query = '') => {
    try {
      setLoading(true);
      const data = await apiService.getAllBooks(query);
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (bookData) => {
    try {
      if (currentBook) {
        // Edit Mode
        await apiService.updateBook(currentBook.id, bookData);
      } else {
        // Create Mode
        await apiService.createBook(bookData);
      }
      setIsModalOpen(false);
      fetchBooks(); // Refresh the list
    } catch (err) {
      alert(`Error saving book: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await apiService.deleteBook(id);
        fetchBooks(); // Refresh list after delete
      } catch (err) {
        alert('Error deleting book');
      }
    }
  };

  const openAddModal = () => {
    setCurrentBook(null); // Clear current book for "Add New"
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setCurrentBook(book); // Set data for "Edit"
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Enchanted Quill Inventory</h1>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
        >
          + Add New Book
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <BookSearchBar onSearch={fetchBooks} />
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading inventory...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <BookTable 
            books={books} 
            onEdit={openEditModal} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BookFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave}
          bookToEdit={currentBook}
        />
      )}
    </div>
  );
};

export default AdminPage;
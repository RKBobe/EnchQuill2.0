import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import apiService from './services/apiService';
import BookTable from './components/BookTable';
import BookFormModal from './components/BookFormModal';

function App() {
  // --- State Management ---
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // null = Add Mode, Object = Edit Mode

  // --- API Calls ---

  // 1. Fetch Books (Read)
  const fetchBooks = async () => {
    try {
      const data = await apiService.getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // 2. Initial Load
  useEffect(() => {
    fetchBooks();
  }, []);

  // 3. Delete Book
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await apiService.deleteBook(id);
        fetchBooks(); // Refresh list
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  // 4. Save Book (Create OR Update)
  const handleSave = async (formData) => {
    try {
      if (currentBook) {
        // Edit Mode: PUT request
        await apiService.updateBook(currentBook.id, formData);
      } else {
        // Add Mode: POST request
        await apiService.createBook(formData);
      }
      fetchBooks(); // Refresh list
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };
    
      // --- Modal Handlers ---
    
      const openAddModal = () => {
        setCurrentBook(null); // Ensure we are in "Add" mode
        setIsModalOpen(true);
      };
    
      const openEditModal = (book) => {
        setCurrentBook(book); // Switch to "Edit" mode with specific data
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setCurrentBook(null);
      };
    
      // --- Render ---
      return (
        <Router>
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Header Section */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  <Link to="/">Enchanted Quill Inventory Manager</Link>
                </h1>
                <div>
                  <button
                    onClick={openAddModal}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 mr-2"
                  >
                    + Add New Book
                  </button>
                </div>
              </div>
    
              <Routes>
                <Route path="/" element={
                  <BookTable 
                    books={books} 
                    onEdit={openEditModal} 
                    onDelete={handleDelete}
                  />
                } />
              </Routes>
    
              {/* Modal Component */}
              <BookFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                bookToEdit={currentBook}
              />
    
            </div>
          </div>
        </Router>
      );
    }
    
    export default App;
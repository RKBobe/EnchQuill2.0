import React, { useState, useEffect } from 'react';

const BookFormModal = ({ isOpen, onClose, onSave, bookToEdit }) => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    price: '',
    quantity: 1
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        isbn: bookToEdit.isbn,
        title: bookToEdit.title,
        author: bookToEdit.author,
        price: bookToEdit.price,
        quantity: bookToEdit.quantity
      });
    } else {
      setFormData({
        isbn: '', title: '', author: '', price: '', quantity: 1
      });
    }
  }, [bookToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {bookToEdit ? 'Edit Book' : 'Add New Book'}
        </h2>
        <form onSubmit={handleSubmit}>
          
          {/* ISBN */}
          <div className="mb-4">
            <label htmlFor="isbn" className="block text-gray-700 text-sm font-bold mb-2">ISBN</label>
            <input 
              type="text" id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} required 
              disabled={!!bookToEdit}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${bookToEdit ? 'bg-gray-200' : ''}`}
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($)</label>
            <input type="number" id="price" step="0.01" name="price" value={formData.price} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {bookToEdit ? 'Save Changes' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
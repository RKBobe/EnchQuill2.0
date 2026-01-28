import axios from 'axios';

// Use an environment variable for the API URL, with a fallback for local development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/books';

// Helper to handle errors consistently
const handleResponse = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error; // Re-throw so the component knows something went wrong
  }
};

const apiService = {
  // GET: Fetch all books (supports optional search query)
  getAllBooks: (searchQuery = '') => {
    const url = searchQuery ? `${API_URL}?search=${searchQuery}` : API_URL;
    return handleResponse(axios.get(url));
  },

  // POST: Add a new book [cite: 135]
  createBook: (bookData) => {
    return handleResponse(axios.post(API_URL, bookData));
  },

  // PUT: Update a book by ID
  updateBook: (id, bookData) => {
    return handleResponse(axios.put(`${API_URL}/${id}`, bookData));
  },

  // DELETE: Remove a book by ID
  deleteBook: (id) => {
    return handleResponse(axios.delete(`${API_URL}/${id}`));
  }
};

export default apiService;
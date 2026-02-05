const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  createBook,
} = require('../controllers/BookController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Public: Everyone can see books
// Private/Admin: Only Admin can create a book
router.route('/')
  .get(getBooks)
  .post(protect, admin, createBook); 

// Public: Everyone can see one book
// Private/Admin: Only Admin can delete or update
router.route('/:id')
  .get(getBookById)
  .delete(protect, admin, deleteBook)
  .put(protect, admin, updateBook);

module.exports = router;
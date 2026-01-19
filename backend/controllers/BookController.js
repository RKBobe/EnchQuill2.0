const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    
    // Map MongoDB's _id to a cleaner 'id' for the frontend
    const formattedBooks = books.map(book => ({
      isbn: book.isbn, 
      title: book.title,
      author: book.author,
      price: book.price,
      quantity: book.quantity
    }));

    res.json(formattedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    // Return the new book with the 'id' field
    res.status(201).json({ ...newBook._doc, isbn: newBook._isbn });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIsbnAndUpdate(
      req.params.isbn, 
      req.body, 
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIsbnAndDelete(req.params.isbn);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
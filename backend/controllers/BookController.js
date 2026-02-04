const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Get book by ID
// @route   GET /api/books/:id
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Create a new book
// @route   POST /api/books
const createBook = asyncHandler(async (req, res) => {
  const { bookID, isbn, title, author, price, quantity, category } = req.body;

  const bookExists = await Book.findOne({ $or: [{ bookID }, { isbn }] });
  if (bookExists) {
    res.status(400);
    throw new Error('A book with this ID or ISBN already exists');
  }

  const book = await Book.create({
    bookID,
    isbn,
    title,
    author,
    price,
    quantity: quantity || 0,
    category: category || 'General'
  });

  res.status(201).json(book);
});

// @desc    Update a book
// @route   PUT /api/books/:id
const updateBook = asyncHandler(async (req, res) => {
  const { bookID, isbn, title, author, price, quantity, category } = req.body;
  const book = await Book.findById(req.params.id);

  if (book) {
    book.bookID = bookID || book.bookID;
    book.isbn = isbn || book.isbn;
    book.title = title || book.title;
    book.author = author || book.author;
    book.price = price || book.price;
    book.quantity = quantity || book.quantity;
    book.category = category || book.category;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.deleteOne();
    res.json({ message: 'Book removed successfully' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
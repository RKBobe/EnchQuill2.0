// file_path: D:\cortex_archive\temp_repos\backend\controllers\BookController.js

//Import the Book Mongoose model, which defines the structure and methods for book data.

const Book = require('../models/Book');


// @desc    Get all books
// @route   GET /api/books
/**
 * retrieves all books from the database and returns them in JSON format.
  */
exports.getBooks = async (req, res) => {
  try {
    // Retrieve all book documents from the MongoDB collection
    const books = await Book.find();
    
    // Map MongoDB's _id to a cleaner 'id' for the frontend (although id is ommitted here,
    // the mapping ensures only necessary fields are returned).)
    const formattedBooks = books.map(book => ({
      id: book._id,
      isbn: book.isbn, 
      title: book.title,
      author: book.author,
      price: book.price,
      quantity: book.quantity
    }));

    // Respond with the array of formatted book objects.
    res.json(formattedBooks);
  } catch (error) {
    // Handle any errors that occur during the database operation.
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
/**
 * Create a new Book document using the data sent in req.body.
 * @param {} req 
 * @param {*} res 
 */
exports.createBook = async (req, res) => {
  try {
    // Create a new book document in the database
    const newBook = await Book.create(req.body);
    // Return the new book with the 'id' field
    res.status(201).json({ ...newBook._doc, id: newBook._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// Updates an existing book identified by its ISBN with new data provided in req.body.
exports.updateBook = async (req, res) => {
  try {
    // find the book by ISBN and update it with the new data
    // and update it with the data from req.body
    // { new: true } returns the updated document
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );

    //respond with the updated book object.
    res.json(updatedBook);
  } catch (error) {

    // Handle errors, such as validation errors or if the book is not found.
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// Deletes a book identified by its ISBN from the database.
exports.deleteBook = async (req, res) => {
  try {
    // find the book by ISBN and delete it
    const deleted = await Book.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
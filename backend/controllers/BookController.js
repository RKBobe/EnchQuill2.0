// file_path: D:\cortex_archive\temp_repos\backend\controllers\BookController.js

//Import the Book Mongoose model, which defines the structure and methods for book data.

const Book = require('../models/Book');



// @route   GET /api/books
/**
 * retrieves all books from the database and returns them in JSON format.
  */
// @desc    Get all books
// @route   GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    
    console.log(`✅ Found ${books.length} books in DB`); // Log success

    // Fix: Send BOTH 'id' and '_id' so Frontend doesn't break
    const formattedBooks = books.map(book => {
      const bookObj = book.toObject(); // Convert to plain object
      return {
        ...bookObj,       // Include all fields (title, price, description)
        id: book._id,     // Add 'id' (clean)
        _id: book._id     // KEEP '_id' (for React key={book._id})
      };
    });

    res.json(formattedBooks);
  } catch (error) {
    // THIS IS THE FIX: Actually log the error to the terminal!
    console.error("🔥 DATABASE ERROR:", error); 
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ ...book._doc, id: book._id });
  } catch (error) {
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
    const newBook = await Book.create(req.body);
    req.wss.clients.forEach(client => {
      if (client.readyState === 1) { // 1 is for OPEN
        client.send(JSON.stringify({ event: 'booksUpdated' }));
      }
    });
    res.status(201).json({ ...newBook._doc, id: newBook._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    req.wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: 'booksUpdated' }));
      }
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }
    req.wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: 'booksUpdated' }));
      }
    });
    res.json({ message: 'Book deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const mongoose = require('mongoose');
const Book = require('./models/Book'); // Ensure this path matches your file structure
require('dotenv').config();

const books = [
  {
    bookID: "EQ-BK-001",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    price: 14.99,
    category: "Classic",
    stock: 25
  },
  {
    bookID: "EQ-BK-002",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    price: 12.50,
    category: "Dystopian",
    stock: 40
  }
];

const seedDatabase = async () => {
  try {
    // Use the Docker service name if the env isn't loading
    const uri = process.env.MONGO_URI || 'mongodb://eq_mongodb:27017/bookstore_db';
    
    await mongoose.connect(uri);
    console.log("Connected to MongoDB...");

    await Book.deleteMany();
    console.log("Existing books cleared.");

    await Book.insertMany(books);
    console.log("Database Seeded Successfully!");
    
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookID: {
    type: String,
    required: true,
    unique: true
  },
  
  isbn: {
    type: String,
    required: true,
    unique: true 
  },

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    default: 1
  },

  category: {
    type: String,
    required: false,
    default: 'General'
  }
});

module.exports = mongoose.model('Book', BookSchema);
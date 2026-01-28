const request = require('supertest');
const createApp = require('../server');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const connectDB = require('../config/db'); // Import connectDB

let app;
let bookId;

beforeAll(async () => {
  await connectDB(global.__MONGO_URI__);
  const mockWss = {
    clients: new Set(),
  };
  app = createApp(mockWss);
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
    await Book.deleteMany({});
    const book = new Book({
        isbn: '978-0321765723',
        title: 'The C++ Programming Language',
        author: 'Bjarne Stroustrup',
        price: 65.99,
        quantity: 10,
    });
    const savedBook = await book.save();
    bookId = savedBook._id.toString();
});

describe('Books API', () => {

  it('should get all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('The C++ Programming Language');
  });

  it('should create a new book', async () => {
    await Book.deleteMany({});
    const res = await request(app)
      .post('/api/books')
      .send({
        isbn: '978-1491904244',
        title: 'You Don\'t Know JS',
        author: 'Kyle Simpson',
        price: 45.99,
        quantity: 20,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get a book by id', async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', bookId);
  });

  it('should update a book', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send({
        price: 70.00,
        quantity: 5,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.price).toBe(70.00);
    expect(res.body.quantity).toBe(5);
  });

  it('should delete a book', async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Book deleted', id: bookId });
  });

  it('should return 404 for a deleted book', async () => {
    await request(app).delete(`/api/books/${bookId}`);
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(404);
  });
});

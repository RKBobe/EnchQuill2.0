const request = require('supertest');
const app = require('../server');
const Book = require('../models/Book');

// Mock the Book model
jest.mock('../models/Book');
// Mock the database connection to avoid trying to connect
jest.mock('../config/db', () => jest.fn());

describe('Book API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/books', () => {
    it('should return all books', async () => {
      const mockBooks = [
        { _id: '1', title: 'Book 1', author: 'Author 1', price: 10 },
        { _id: '2', title: 'Book 2', author: 'Author 2', price: 20 },
      ];
      Book.find.mockResolvedValue(mockBooks);

      const res = await request(app).get('/api/books');

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
      expect(res.body[0].title).toEqual('Book 1');
      // Check data mapping (id field)
      expect(res.body[0].id).toEqual('1');
    });

    it('should handle errors', async () => {
      Book.find.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/api/books');
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const newBookData = { title: 'New Book', author: 'New Author', price: 15 };
      const createdBook = { ...newBookData, _id: '3', _doc: { ...newBookData, _id: '3' } };

      Book.create.mockResolvedValue(createdBook);

      const res = await request(app).post('/api/books').send(newBookData);

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual('New Book');
      expect(res.body.id).toEqual('3');
    });
  });

    describe('DELETE /api/books/:id', () => {
    it('should delete a book', async () => {
      Book.findByIdAndDelete.mockResolvedValue({ _id: '1', title: 'Book 1' });

      const res = await request(app).delete('/api/books/1');

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Book deleted');
    });

    it('should return 404 if book not found', async () => {
      Book.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete('/api/books/999');

      expect(res.statusCode).toEqual(404);
    });
  });
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('./controllers/BookController');

const createApp = (wss) => {
  const app = express();

  // 1. Connect to Database (only if not in test environment)
  if (process.env.NODE_ENV !== 'test') {
    connectDB();
  }

  // 2. Middleware
  app.use(express.json()); // Allows parsing JSON body [cite: 135]
  app.use(cors()); // Critical for allowing your React frontend to talk to this backend
  
  // Attach wss to each request
  app.use((req, res, next) => {
    req.wss = wss;
    next();
  });

  // 3. Routes [cite: 187-225]
  const router = express.Router();

  router.get('/books', getBooks);
  router.get('/books/:id', getBookById);
  router.post('/books', createBook);
  router.put('/books/:id', updateBook);
  router.delete('/books/:id', deleteBook);
  //Mock payment processing endpoint
  router.post('/orders', (req, res) => {
    console.log("💰 Mock Payment Received:", req.body);
    
    // Simulate a 1-second processing delay
    setTimeout(() => {
        // Send back a fake "Success" signal
        res.status(201).json({ 
            message: 'Payment Simulated Successfully', 
            orderId: 'ORDER-' + Date.now(),
            status: 'paid'
        });
    }, 1000);
  });
  app.use('/api', router); // Mounts routes at /api/...
  
  return app;
};

module.exports = createApp;
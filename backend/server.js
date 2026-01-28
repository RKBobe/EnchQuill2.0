const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { getBooks, createBook, updateBook, deleteBook } = require('./controllers/BookController');

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(express.json()); // Allows parsing JSON body [cite: 135]
app.use(cors()); // Critical for allowing your React frontend to talk to this backend

// 3. Routes [cite: 187-225]
const router = express.Router();

router.get('/books', getBooks);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

app.use('/api', router); // Mounts routes at /api/...

// 4. Start Server
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
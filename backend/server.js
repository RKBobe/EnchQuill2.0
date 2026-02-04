const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes'); // <--- New Order Routes

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); // <--- Mount Order Routes

const PORT = process.env.PORT || 5000;

// explicitely bind to 0.0.0.0 for Docker networking
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} - Open to Docker Network`);
});
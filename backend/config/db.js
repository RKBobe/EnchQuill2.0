const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the environment from Docker, fallback to local if not in Docker
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/enchanted_quill?authSource=admin';
    
    const conn = await mongoose.connect(uri);
    console.log('MongoDB Connected: ${conn.connection.host}');
  } catch (error) {
    console.error('Error: ${error.message}');
    process.exit(1);
  }
};

module.exports = connectDB;
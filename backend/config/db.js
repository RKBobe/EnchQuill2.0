// import the Mongoose library, which provides an elegant way to interact with MongoDB
// by providing a schema-based solution to model application data.

const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    const connectionUri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/enchanted_quill?authSource=admin';
    const conn = await mongoose.connect(connectionUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
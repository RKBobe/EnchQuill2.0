// import the Mongoose library, which provides an elegant way to interact with MongoDB
// by providing a schema-based solution to model application data.

const mongoose = require('mongoose');

/**
 * @desc Establishes and manages the connection to the MongoDB database.
 * It uses the MONGO_URI environment variable for the connection string,
 * falling back to a local MongoDB instance if not set.   
 */ 

const connectDB = async () => {
  try {
    // ----Database URI Configuration-----
    // Determine the MongoDB connection URI.
    // It prioritizes the MONGO_URI environment variable, which is typically set in a Docker environment.
    // If this variable is not set, it defaults to a local MongoDB instance.    
    // Use the environment from Docker, fallback to local if not in Docker
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/enchanted_quill?authSource=admin';

    // Attempt to connect to the MongoDB using the determined URI.
    // Mongoose handles connection pooling and configuration internally.
    const conn = await mongoose.connect(uri);

    // Log a success message indicating the host to which the application has connected.
    // Note: Using template literals for better readability.
    console.log('MongoDB Connected: ${conn.connection.host}');
  } catch (error) {
    // error handling - log the error message and exit the process with a failure code.
    console.error('Error: ${error.message}');

    // Exit the process with a failure code
    // since database connectivity is usually critical for the backend to function.
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application.
// This allows the database connection logic to be modular and reusable.
// Export the connectDB function  

module.exports = connectDB;
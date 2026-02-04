const mongoose = require('mongoose');

const connectDB = async () => {
  const connString = process.env.MONGO_URI;
  
  console.log(`Attempting to connect to: ${connString}`);

  try {
    const conn = await mongoose.connect(connString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log("Retrying connection in 5 seconds...");
    // Instead of process.exit(1), wait and try again
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
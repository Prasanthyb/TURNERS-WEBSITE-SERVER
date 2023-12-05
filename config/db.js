const mongoose = require('mongoose');

function connectToDatabase() {
  const DB_URL = process.env.MONGO_URI;
  mongoose.connect(DB_URL, {
    serverSelectionTimeoutMS: 5000,
  });

  const conn = mongoose.connection;

  conn.once('open', () => {
    console.log('Successfully connected to the database');
  });

  conn.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  return conn; // Return the connection object if needed
}

module.exports = {
  connectToDatabase,
};

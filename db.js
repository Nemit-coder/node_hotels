const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Set up MongoDb Connection
mongoose.connect(mongoURL, {
    // useNewURLParser: true,
    // useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected To MongoDB Server');
}) 

db.on('error', (err) => {
    console.log('MongoDB Connection Error : ', err);
})

db.on('disconnected', () => {
    console.log('Disconnected To MongoDB Server');
})

// Export the database connection
module.exports = db;
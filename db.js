const mongoose = require('mongoose');

//Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

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
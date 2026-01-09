const mongoose = require('mongoose');
const back_properties = require('./back_properties');
const mongo_uri = back_properties.MONGO_URI;

const connectDB = async () => {
    const conn = await mongoose.connect(mongo_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
}

module.exports = connectDB;
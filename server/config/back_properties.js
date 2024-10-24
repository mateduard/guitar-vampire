// ENVIRONMENT VARIABLES CONFIGURATION FILE

// require('dotenv').config();

const back_properties = {
    // Backend server settings
    BACK_PORT: process.env.BACK_PORT || 5000,
    BACK_SERVICE: process.env.BACK_SERVICE,
    // Frontend server settings
    FRONT_SERVICE: process.env.FRONT_SERVICE,
    FRONT_PORT: process.env.FRONT_PORT || 3000,
    MONGO_URI: 'mongodb+srv://mateduard:castravetemurat01@cluster0.8nuzcxs.mongodb.net/guitarvampire?retryWrites=true&w=majority',
  };
  
  module.exports = back_properties;
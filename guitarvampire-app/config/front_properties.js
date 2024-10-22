const front_properties = {
    // Backend server settings
    BACK_PORT: process.env.BACK_PORT || 5000,
    BACK_SERVICE: process.env.BACK_SERVICE,

    // Frontend server settings
    FRONT_PORT: process.env.FRONT_PORT || 3000,
  };
  
  module.exports = front_properties;
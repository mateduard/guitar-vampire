// ENVIRONMENT VARIABLES CONFIGURATION FILE

const front_properties = {
    // Backend server settings
    BACK_PORT: import.meta.env.VITE_BACK_PORT || '5000',
    BACK_SERVICE: import.meta.env.VITE_BACK_SERVICE || '',

    // Frontend server settings
    FRONT_PORT: import.meta.env.VITE_FRONT_PORT || '3000', // WATCH OUT, AS THE VARIABLE USED IN "vite.config.js" IS NOT CALLED FROM HERE, BUT FROM process.env IN THAT FILE, OTHERWISE IT IS UNDEFINED BECAUSE IT WOULD BE LOADED BEFORE VITE
  };
  
  export default front_properties;
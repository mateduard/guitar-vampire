const back_properties = require('./config/back_properties');
const express = require('express');
const connectDB = require('./config/db');
// require('dotenv').config();
const back_port = back_properties.BACK_PORT;
const cors = require('cors');
const GuitarModel = require('./models/Guitar'); // in case of any POST request..
const path = require('path');

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, '../guitarvampire-app/public')));
app.use(express.json());

// ATENTIE, MAI JOS ERA :  + am modificat in guitarConstants.js => era http://localhost:5000
/* origin: ['http://localhost:5000',
      'http://localhost:3000'], */

app.use(
  cors(/* {
    origin: ['http://localhost:5000',
        'http://localhost:3000'],
    credentials: true,
  } */)
);

app.get('/', (req, res) => {
  console.log();
  res.json({
    message: `Welcome to the GuitarVampire API. This service is exposed at ${back_properties.BACK_SERVICE}:${back_properties.BACK_PORT}`,
  });
});

const guitarsRouter = require('./routes/guitars');
app.use('/api/guitars', guitarsRouter);

app.listen(back_port, () => {
  console.log(`Server is running on port ${back_port}`);
});

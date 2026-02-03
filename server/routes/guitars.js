const express = require('express');
const router = express.Router();
const Guitar = require('../models/Guitar');
const client = require('prom-client');

const guitarAccessCounter = new client.Counter({
  name: 'guitar_route_access_total',
  help: 'Number of times the /api/guitars has been accessed',
});

router.get('/', async (req, res) => {
    try{
        console.log("Someone hit the guitars API page (/api/guitars)");
        guitarAccessCounter.inc();
        const guitars = await Guitar.find();
        res.json({success: true, response: guitars});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, error: 'Something went wrong'});
    }
})

module.exports = {
    router,
    guitarAccessCounter,
};
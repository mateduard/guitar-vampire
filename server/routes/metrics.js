const express = require('express');
const router = express.Router();
const client = require('prom-client');
const rootAccessCounter = require('../server.js');
const { guitarAccessCounter } = require('./guitars');

const register = new client.Registry();
register.registerMetric(rootAccessCounter);
register.registerMetric(guitarAccessCounter);

router.get('/', async (req, res) => {
    try{
      console.log("Someone hit the metrics page (/metrics)");  
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, error: 'Something went wrong'});
    }
});

module.exports = router;
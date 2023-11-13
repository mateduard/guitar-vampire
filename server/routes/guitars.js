const express = require('express');
const router = express.Router();
const Guitar = require('../models/Guitar');

router.get('/', async (req, res) => {
    try{
        const guitars = await Guitar.find();
        res.json({success: true, response: guitars});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, error: 'Something went wrong'});
    }
})

module.exports = router;
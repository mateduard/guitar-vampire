const mongoose = require('mongoose');

const GuitarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name field'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price field'],
    }
});

module.exports = mongoose.model('Guitar', GuitarSchema, 'guitars');
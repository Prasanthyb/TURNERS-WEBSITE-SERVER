const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Please enter a title']
    },
    name: [{
        type: String,
        required: [true, 'Please enter a title']
    }],
    color: [{
        type: String,
        required: [true, 'Please enter a color']
    }],

    amount: {
        type: Number,
        required: [true, 'Please enter a price']
    }
    
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

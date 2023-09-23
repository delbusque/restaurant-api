const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chefOrderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tableNum: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    quantityType: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
    },
    waiting: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('ChefOrder', chefOrderSchema)
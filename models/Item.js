const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    family: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
    },
    price: {
        type: Number,
        required: true,
        min: 0.10
    },
    quantity: {
        type: Number,
        required: true
    },
    quantityType: {
        type: String,
        default: function () {
            if (this.family === 'drinks') {
                if (this.quantity < 1) {
                    return 'мл';
                }
                else {
                    return 'л';
                }
            } else if (this.family === 'food') {
                if (this.quantity < 1) {
                    return 'гр';
                }
                else {
                    return 'кг';
                }
            }
        }
    }
});

module.exports = mongoose.model('Item', itemSchema);
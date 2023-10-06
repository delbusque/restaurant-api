const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    opened: {
        type: Boolean,
        required: true
    },
    orders: {
        type: Array,
        required: true
    },
    bill: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number
    },
    reserved: {
        type: Boolean
    }
});

module.exports = mongoose.model('Table', tableSchema);
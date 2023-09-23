const Item = require('../models/Item.js');
const mongoose = require('mongoose');

const getAllDrinks = async (req, res) => {
    let drinks = await Item.find({ family: 'drinks' });

    if (drinks.length < 1) {
        return res.status(404).json({ mssg: `No drinks there !` })
    }

    res.status(200).json(drinks);
}

const getAllFood = async (req, res) => {
    let food = await Item.find({ family: 'food' });

    if (food.length < 1) {
        return res.status(404).json({ mssg: `No food there !` })
    }

    res.status(200).json(food);
}

const getAllItems = async (req, res) => {
    let items = await Item.find({});

    if (items.length < 1) {
        return res.status(404).json({ mssg: `No items there !` })
    }

    res.status(200).json(items);
}

const getItemsByType = async (req, res) => {
    let family = req.baseUrl.split('/')[1];

    const type = req.params.type
    const items = await Item.find({ type });

    if (items.length < 1) {
        return res.status(404).json({ mssg: `No ${family} of that type !` })
    }

    res.status(200).json(items);
}

const addNewStockItem = async (req, res) => {
    const { name, family, type, ingredients, price, quantity } = req.body;

    const emptyFields = [];
    !name && emptyFields.push('name');
    !family && emptyFields.push('family');
    !type && emptyFields.push('type');
    !price && emptyFields.push('price');
    !quantity && emptyFields.push('quantity');

    const negZero = [];
    price <= 0 && negZero.push('price');
    quantity <= 0 && negZero.push('quantity');

    const exists = await Item.findOne({ name });

    if (exists) {
        return res.status(400).json({ error: 'Already an item with such name in stock !', emptyFields, negZero })
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'All fields should be filled !', emptyFields, negZero })
    }

    if (price <= 0 || quantity <= 0) {
        return res.status(400).json({ error: 'Price and quantity can not be negative or zero !', negZero })
    }

    try {
        const newItiem = await Item.create({ name, family, type, ingredients, price, quantity });
        res.status(200).json(newItiem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteStockItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such item to delete !' })
    }

    const item = await Item.findOneAndDelete({ _id: id })

    if (!item) {
        return res.status(400).json({ error: 'No such item in stock !' })
    }

    res.status(200).json(item);
}

const editStockItem = async (req, res) => {
    const { id } = req.params;
    const { name, family, type, price, quantity } = req.body;

    const editedItem = { ...req.body };

    const emptyFields = [];
    !name && emptyFields.push('name');
    !family && emptyFields.push('family');
    !type && emptyFields.push('type');
    !price && emptyFields.push('price');
    !quantity && emptyFields.push('quantity');

    const negZero = [];
    price <= 0 && negZero.push('price');
    quantity <= 0 && negZero.push('quantity');

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'No such item to edit !' })
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'All fields should be filled !', emptyFields, negZero })
    }

    if (price <= 0 || quantity <= 0) {
        return res.status(400).json({ error: 'Price and quantity can not be negative or zero !', negZero })
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, editedItem, { new: true });

        if (!updatedItem) {
            res.status(400).json({ error: 'No such item in stock!' })
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllDrinks,
    getAllFood,
    getAllItems,
    getItemsByType,
    addNewStockItem,
    deleteStockItem,
    editStockItem
}
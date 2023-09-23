const ChefOrder = require('../models/ChefOrder.js');

const addOrders = async (req, res) => {

    const { name, ingredients, quantity, quantityType, count, tableNum } = req.body;

    try {
        for (let i = 0; i < count; i++) {

            await ChefOrder.create({ name, ingredients, count, quantity, quantityType, tableNum })
        }
        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getOrders = async (req, res) => {
    try {
        const waitingOrders = await ChefOrder.find({})
        res.status(200).json(waitingOrders)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateWaitingStatus = async (req, res) => {
    const { _id } = req.body

    try {
        const updatedOrder = await ChefOrder.updateOne({ _id }, { waiting: false });
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteReadyOrder = async (req, res) => {
    const { _id } = req.body;

    try {
        const result = await ChefOrder.deleteOne({ _id })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addOrders,
    getOrders,
    updateWaitingStatus,
    deleteReadyOrder
}
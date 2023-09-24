const Table = require('../models/Table.js');

const getAllTables = async (req, res) => {

    try {
        const tables = await Table.find({});
        res.status(200).json(tables);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getOneTable = async (req, res) => {
    const { id } = req.params;

    try {
        const table = await Table.findById(id)
        res.status(200).json(table);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllTables,
    getOneTable
}
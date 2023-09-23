const Table = require('../models/Table.js');

const getAllTables = async (req, res) => {
    const tables = await Table.find({});
    res.status(200).json(tables);
}

module.exports = {
    getAllTables
}
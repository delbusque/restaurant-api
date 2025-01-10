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

const createTable = async (req, res) => {
    const { type } = req.body

    const tables = await Table.find({ type }).exec();
    console.log(tables.length);

    if (type === 'table') {

        try {
            const newTable = await Table.create({ number: tables.length + 1, type, opened: false, paid: false, orders: [], bill: 0 })
            res.status(200).json(newTable);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    } else if (type === 'away') {

        try {
            const newTable = await Table.create({ number: tables.length + 101, type, opened: false, paid: false, orders: [], bill: 0 })
            res.status(200).json(newTable);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

const editTable = async (req, res) => {
    const { id } = req.params;

    const editedTable = { ...req.body };

    console.log(id);
    console.log(editedTable);


    try {
        const updatedTable = await Table.findByIdAndUpdate(id, editedTable.table, { new: true });

        if (!updatedTable) {
            res.status(400).json({ error: 'No such item in stock!' })
        }
        res.status(200).json(updatedTable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getAllTables,
    getOneTable,
    createTable,
    editTable
}
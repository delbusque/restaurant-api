const express = require('express');

const {
    getAllTables,
    getOneTable,
    createTable
} = require('../controllers/tableController.js')

const router = express.Router();

router.get('/', getAllTables);
router.get('/:id', getOneTable);
router.post('/create', createTable);


module.exports = router;
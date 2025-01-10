const express = require('express');

const {
    getAllTables,
    getOneTable,
    createTable,
    editTable
} = require('../controllers/tableController.js')

const router = express.Router();

router.get('/', getAllTables);
router.get('/:id', getOneTable);
router.post('/create', createTable);
router.post('/edit/:id', editTable);



module.exports = router;
const express = require('express');

const {
    getAllTables,
    getOneTable
} = require('../controllers/tableController.js')

const router = express.Router();

router.get('/', getAllTables);
router.get('/:id', getOneTable);

module.exports = router;
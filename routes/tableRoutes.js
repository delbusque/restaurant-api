const express = require('express');

const {
    getAllTables
} = require('../controllers/tableController.js')

const router = express.Router();

router.get('/', getAllTables);

module.exports = router;
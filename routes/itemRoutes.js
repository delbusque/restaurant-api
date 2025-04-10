const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    getAllItems,
    addNewStockItem,
    deleteStockItem,
    editStockItem,
    updateStock
} = require('../controllers/itemController.js');

router.get('/', getAllItems);

router.use(authMiddleware);

router.post('/add', addNewStockItem);
router.post('/edit/:id', editStockItem);
router.delete('/:id', deleteStockItem);
router.patch('/:id/stock', updateStock);

module.exports = router;
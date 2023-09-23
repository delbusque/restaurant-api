const router = require('express').Router();

const {
    addOrders,
    getOrders,
    updateWaitingStatus,
    deleteReadyOrder
} = require('../controllers/chefController.js');

router.post('/add-orders', addOrders);
router.get('/get-orders', getOrders);
router.post('/update-waiting-status', updateWaitingStatus);
router.post('/delete-ready-order', deleteReadyOrder)

module.exports = router;

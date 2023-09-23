const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    getMessages,
    addMessage
} = require('../controllers/messageController.js');

router.get('/', getMessages);

router.use(authMiddleware);

router.post('/add', addMessage);
// router.post('/edit/:id', editMessage);
// router.delete('/:id', deleteMessage);

module.exports = router;
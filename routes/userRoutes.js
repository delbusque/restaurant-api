const express = require('express');
const {
    loginUser,
    signupUser,
    getAllUsers,
    editUser
} = require('../controllers/userController.js')

const router = express.Router();

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/edit', editUser)
router.get('/', getAllUsers)

module.exports = router;
const express = require('express');
const {
    loginUser,
    signupUser,
    getAllUsers,
    editUser,
    editRole,
    deleteUser
} = require('../controllers/userController.js')

const router = express.Router();

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/edit', editUser)
router.get('/', getAllUsers)
router.patch('/:id', editRole)
router.delete('/:id', deleteUser)

module.exports = router;
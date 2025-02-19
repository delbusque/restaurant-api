const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '5d' });
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ email, token, role: user.role, firstName: user.firstName, lastName: user.lastName, phone: user.phone, id: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token, role: 402, id: user._id });
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}

const editUser = async (req, res) => {
    const { email, firstName, lastName, phone } = req.body;

    const emptyFields = [];
    !firstName && emptyFields.push('firstName');
    !lastName && emptyFields.push('lastName');
    !phone && emptyFields.push('phone');

    if (!User.find({ email: email })) {
        res.status(400).json({ error: 'No such user to edit !' })
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Всички полета трябва да бъдат попълнени !', emptyFields })
    }

    try {
        const updatedUser = await User.findOneAndUpdate({ email: email }, { firstName, lastName, phone }, { new: true });

        if (!updatedUser) {
            res.status(400).json({ error: 'No such User !' })
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {
    loginUser,
    signupUser,
    getAllUsers,
    editUser
}
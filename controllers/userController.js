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

        res.status(200).json({ email, token, role: user.role, firstName: user.firstName, lastName: user.lastName, phone: user.phone, id: user._id, name: user.name })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const signupUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const user = await User.signup(email, password, name);
        const token = createToken(user._id);

        res.status(200).json({ email, token, role: 402, id: user._id, name });
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}

const editUser = async (req, res) => {
    const { email, phone, name, lastName } = req.body;

    if (!User.find({ email: email })) {
        res.status(400).json({ error: 'No such user to edit !' })
    }

    try {
        const updatedUser = await User.findOneAndUpdate({ email: email }, { phone, name, lastName }, { new: true });

        if (!updatedUser) {
            res.status(400).json({ error: 'No such User !' })
        }

        res.status(200).json({ email, role: updatedUser.role, firstName: updatedUser.firstName, lastName: updatedUser.lastName, phone: updatedUser.phone, id: updatedUser._id, name: updatedUser.name });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const editRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginUser,
    signupUser,
    getAllUsers,
    editUser,
    editRole,
    deleteUser
};
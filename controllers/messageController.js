const Message = require('../models/Message.js');
const mongoose = require('mongoose');

const getMessages = async (req, res) => {
    let messages = await Message.find({});

    if (messages.length < 1) {
        return res.status(404).json({ mssg: `No messages there !` })
    }
    try {
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const addMessage = async (req, res) => {
    const { author, content } = req.body;

    try {
        const message = await Message.create({ content, author });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    getMessages,
    addMessage
}
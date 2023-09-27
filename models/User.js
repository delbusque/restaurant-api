const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }]
})

userSchema.statics.signup = async function (email, encryptedPassword) {

    const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '123456'

    const decrypt = (encryptedText) => {
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey)
        const plainText = bytes.toString(CryptoJS.enc.Utf8)
        return plainText
    }

    const password = decrypt(encryptedPassword)

    if (!email || !password) {
        throw Error('All fields must be filled !')
    }

    if (!validator.isEmail(email) || !validator.isStrongPassword(password)) {
        throw Error('Invalid email or password format !');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Already a user with that email !')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, firstName: '', lastName: '', phone: "" });
    return user;
}

userSchema.statics.login = async function (email, encryptedPassword) {

    const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '123456'

    const decrypt = (encryptedText) => {
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey)
        const plainText = bytes.toString(CryptoJS.enc.Utf8)
        return plainText
    }

    const password = decrypt(encryptedPassword)

    if (!email || !password) {
        throw Error('All fields must be filled !')
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Login credentials do not match !')
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Login credentials do not match !')
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);
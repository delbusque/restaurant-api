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
    role: {
        type: Number,
        required: true,
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

    function decrypt(word) {
        let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
        let bytes = CryptoJS.AES.decrypt(decData, secretKey).toString(CryptoJS.enc.Utf8)
        return JSON.parse(bytes)
    }

    const password = decrypt(encryptedPassword)

    if (!email || !password) {
        throw Error('Всички полета трябва да бъдат попълнени !')
    }

    if (!validator.isEmail(email) || !validator.isStrongPassword(password,
        { minLength: 4, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
        throw Error('Невалиден email или парола !');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Невалиден email или парола !')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, role: 402, firstName: '', lastName: '', phone: "" });
    return user;
}

userSchema.statics.login = async function (email, encryptedPassword) {

    const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '123456'

    function decrypt(word) {
        let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
        let bytes = CryptoJS.AES.decrypt(decData, secretKey).toString(CryptoJS.enc.Utf8)
        return JSON.parse(bytes)
    }

    const password = decrypt(encryptedPassword)

    if (!email || !password) {
        throw Error('Всички полета трябва да бъдат попълнени !')
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Невалиден email или парола !')
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Невалиден email или парола !')
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);
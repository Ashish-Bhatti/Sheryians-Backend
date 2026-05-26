const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'user already exists with this username'],
        required: [true, 'username is required'],
    },
    email: {
        type: String,
        unique: [true, 'user already exists with this email id'],
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false,
    },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

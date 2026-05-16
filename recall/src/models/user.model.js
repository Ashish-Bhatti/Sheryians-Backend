const mongoose = require('mongoose');

const userSchmea = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'user already exists with this username'],
        required: [true, ' username is required'],
    },
    email: {
        type: String,
        unique: [true, ' email id already exists'],
        required: [true, ' email is required'],
    },
    password: {
        type: String,
        required: [true, ' password is required'],
    },
    bio: {
        type: String,
        default: '',
    },
    profileImaghe: {
        type: String,
        default:
            'https://ik.imagekit.io/ashuImageKit/photo-1566847438217-76e82d383f84_q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA_3D_3D',
    },
});

const userModel = mongoose.model('user', userSchmea);

module.exports = userModel;

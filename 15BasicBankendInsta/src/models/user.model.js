const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, 'user already exist with this username'],
        required: [true, 'user name is required'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    bio: String,
    profileImage: {
        type: String,
        default:
            'https://ik.imagekit.io/ashuImageKit/photo-1566847438217-76e82d383f84_q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA_3D_3D',
    },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

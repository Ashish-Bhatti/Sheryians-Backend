const mongoose = require('mongoose');

// create Schema

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, 'With this email user account already exists'],
    },
    password: String,
});

// create model

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique : [true, 'user already exists with this username'],
        required: [true, 'username is required'],
    },
    email: {
        type: String,
        unique : [true, 'user already exists with this email'],
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select : false, // when we fetch user data from database it will not includethe password field by default for security reasons
    },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

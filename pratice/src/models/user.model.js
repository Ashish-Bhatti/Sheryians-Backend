const mongoose = require('mongoose');

/**
 * User Schema
 * - Defines structure of user documents in MongoDB
 * - Used for authentication (login/register) and user profile data
 *
 * Fields:
 * - username
 * - email
 * - password
 * - bio
 * - profileImage
 */
const userSchema = new mongoose.Schema({
    /**
     * Username of the user
     * - Must be unique
     * - Required field
     */
    username: {
        type: String,
        unique: [true, 'user already exists with this username'],
        required: [true, 'username is required'],
    },

    /**
     * Email of the user
     * - Must be unique
     * - Required field
     */
    email: {
        type: String,
        unique: [true, 'email already exists'],
        required: [true, 'email is required'],
    },

    /**
     * Password (hashed before storing)
     * - Required field
     * - Should never store plain text passwords
     */
    password: {
        type: String,
        required: [true, 'password is required'],
    },

    /**
     * User bio / description
     * - Optional field
     */
    bio: {
        type: String,
        default: '',
    },

    /**
     * Profile image URL
     * - Defaults to a placeholder image if user doesn't upload one
     */
    profileImage: {
        type: String,
        default:
            'https://ik.imagekit.io/ashuImageKit/photo-1566847438217-76e82d383f84_q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA_3D_3D',
    },
});

/**
 * User Model
 * - Creates "user" collection in MongoDB
 * - Used to interact with user documents (CRUD operations)
 */
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

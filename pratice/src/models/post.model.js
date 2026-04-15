const mongoose = require('mongoose');

/**
 * Post Schema
 * - Defines the structure of a "post" document in MongoDB
 * - Each post belongs to a user and contains an image + optional caption
 */
const postSchema = new mongoose.Schema({

    /**
     * Caption for the post
     * - Optional field
     * - Defaults to empty string if not provided
     */
    caption: {
        type: String,
        default: '',
    },

    /**
     * Image URL of the post
     * - Required field
     * - Stores the URL returned from ImageKit (or any cloud storage)
     */
    image: {
        type: String,
        required: [true, 'Image is required'],
    },

    /**
     * Reference to the user who created the post
     * - Stores MongoDB ObjectId
     * - Creates relationship between "posts" and "users" collection
     * - Enables population (e.g., .populate('user'))
     */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // refers to "user" collection/model
        required: [true, 'user is required'],
    },
});


/**
 * Post Model
 * - Creates a collection named "posts" in MongoDB
 * - Used to perform CRUD operations (create, read, update, delete)
 */
const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;
const mongoose = require('mongoose');

/**
 * Like Schema
 * - Represents a "like" relationship between a user and a post
 *
 * Example:
 * - user → likes → post
 */
const likeSchema = new mongoose.Schema(
    {
        /**
         * Reference to the post being liked
         * - Stored as ObjectId
         * - Links to "posts" collection
         */
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
            required: [true, 'post id is required for creating a like'],
        },

        /**
         * User who liked the post
         * ⚠️ Currently stored as String (username)
         * - Works, but not ideal for scalability
         */
        user: {
            type: String,
            required: [true, 'username is required for creating a like'],
        },
    },
    {
        timestamps: true, // automatically adds createdAt & updatedAt
    }
);

/**
 * Compound Index
 * - Ensures a user can like a specific post only once
 * - Prevents duplicate likes
 */
likeSchema.index({ post: 1, user: 1 }, { unique: true });

/**
 * Like Model
 * - Creates "likes" collection in MongoDB (auto-pluralized)
 * - Used to manage like/unlike operations
 */
const likeModel = mongoose.model('like', likeSchema);

module.exports = likeModel;

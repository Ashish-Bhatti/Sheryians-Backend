const mongoose = require('mongoose');

/**
 * Follow Schema
 * - Represents a relationship where one user follows another user
 *
 * follower → the user who follows
 * followee → the user being followed
 */
const followSchema = new mongoose.Schema(
    {
        follower: {
            type: String,
        },
        followee: {
            type: String,
        },
    },
    { timestamps: true }
);

/**
 * Compound Index
 * - Ensures a user cannot follow the same person multiple times
 */
followSchema.index({ follower: 1, followee: 1 }, { unique: true });

/**
 * Follow Model
 * - Creates "follows" collection in MongoDB (auto-pluralized)
 * - Used to manage follow relationships
 */
const followModel = mongoose.model('follow', followSchema);

module.exports = followModel;

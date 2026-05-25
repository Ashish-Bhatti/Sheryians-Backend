const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
    {
        userA: {
            type: String,
            required: [true, 'sender is required'],
        },
        userB: {
            type: String,
            required: [true, 'receiver is required'],
        },
    },
    { timestamps: true }
);

friendSchema.index({ userA: 1, userB: 1 }, { unique: true });

const friendModel = mongoose.model('friend', friendSchema);

module.exports = friendModel;

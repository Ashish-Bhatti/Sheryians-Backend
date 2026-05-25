const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: [true, 'sender is required'],
        },
        receiver: {
            type: String,
            required: [true, 'receiver is required'],
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

const friendRequestModel = mongoose.model('friendRequest', friendRequestSchema);

module.exports = friendRequestModel;

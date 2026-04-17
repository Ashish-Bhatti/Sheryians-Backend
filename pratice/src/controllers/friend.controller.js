const friendModel = require('../models/friend.model');
const friendRequestModel = require('../models/friendRequest.model');
const userModel = require('../models/user.model');

/**
 * @controller  sendFriendRequest
 * @route       POST /api/friend/request/:username
 * @desc        Send a friend request
 * @access      Protected
 */
async function sendFriendRequestController(req, res) {
    const senderUsername = req.user.username;
    const receiverUsername = req.params.userId;

    // prevent users from sending friend requests to themselves
    if (senderUsername === receiverUsername) {
        return res.status(400).json({ message: 'You cannot send a friend request to yourself' });
    }

    // check if the receiver user exists
    const checkUserExists = await userModel.findOne({ username: receiverUsername });

    if (!checkUserExists) {
        return res.status(404).json({ message: 'User not found' });
    }

    // check if the sender and receiver are already friends
    const existingFriend = await friendModel.findOne({
        $or: [
            { userA: senderUsername, userB: receiverUsername },
            { userA: receiverUsername, userB: senderUsername },
        ],
    });

    if (existingFriend) {
        return res.status(400).json({ message: 'you are already friends' });
    }

    // check if a friend request has already been sent from the sender to the receiver
    const existingRequest = await friendRequestModel.findOne({
        sender: senderUsername,
        receiver: receiverUsername,
        status: 'pending',
    });

    if (existingRequest) {
        return res.status(400).json({ message: 'you have already sent a friend request to this user' });
    }

    // 🔥 reverse request exists → auto accept
    const reverseRequest = await friendRequestModel.findOne({
        sender: receiverUsername,
        receiver: senderUsername,
        status: 'pending',
    });

    if (reverseRequest) {
        await friendModel.create({
            userA: senderUsername,
            userB: receiverUsername,
        });
        reverseRequest.status = 'accepted';
        /*
        reverseRequest.status = 'accepted';
        At this stage, you are only changing the data locally in your server's memory.
        You've taken the document found in the database and changed the value of its status property from 'pending' to 'accepted'.
        Note: The database still thinks the status is 'pending' at this exact moment.
         */
        await reverseRequest.save();
        /*
        await reverseRequest.save();
        This is the command that actually talks to MongoDB.
        Mongoose looks at the reverseRequest document, sees that the status has been modified, and sends an UPDATE command to the database.
        The await keyword tells your code to pause until the database confirms, "Okay, I've updated that record."
         */

        return res.status(201).json({
            message: 'friend request accepted successfully',
        });
    }

    const newFriendRequest = await friendRequestModel.create({
        sender: senderUsername,
        receiver: receiverUsername,
    });

    return res.status(201).json({
        message: 'friend request sent successfully',
    });
}

async function acceptFriendRequestController(req, res) {
    const user = req.user.username;
    const requestId = req.params.requestId;

    //find request
    const friendRequest = await friendRequestModel.findById(requestId);
    if (!friendRequest) {
        return res.status(404).json({ message: 'friend request not found' });
    }

    // check if the user is the receiver of the request
    if (friendRequest.receiver !== user) {
        return res.status(403).json({ message: 'you are not authorized to accept this friend request' });
    }

    // check if the request is still pending
    if (friendRequest.status !== 'pending') {
        return res.status(400).json({ message: `you have already  ${friendRequest.status} this friend request` });
    }

    // create friendship
    await friendModel.create({
        userA: friendRequest.sender,
        userB: friendRequest.receiver,
    });

    //update request status
    friendRequest.status = 'accepted';
    await friendRequest.save();

    res.status(200).json({
        message: 'friend request accepted',
    });
}

async function rejectFriendRequestController(req, res) {
    const user = req.user.username;
    const requestId = req.params.requestId;

    //find request
    const friendRequest = await friendRequestModel.findById(requestId);
    if (!friendRequest) {
        return res.status(404).json({ message: 'friend request not found' });
    }

    // check if the user is the receiver of the request
    if (friendRequest.receiver !== user) {
        return res.status(403).json({ message: 'you are not authorized to reject this friend request' });
    }

    // check if the request is still pending
    if (friendRequest.status !== 'pending') {
        return res.status(400).json({ message: `you have already ${friendRequest.status} this friend request` });
    }

    //update request status
    friendRequest.status = 'rejected';
    await friendRequest.save();

    res.status(200).json({
        message: 'friend request rejected',
    });
}

async function unfriendController(req, res) {
    const user = req.user.username;
    const friendUsername = req.params.userId;

    // check if they are friends
    const existingFriend = await friendModel.findOne({
        $or: [
            { userA: user, userB: friendUsername },
            { userA: friendUsername, userB: user },
        ],
    });
    if (!existingFriend) {
        return res.status(400).json({ message: 'you are not friends with this user' });
    }

    // delete the friendship
    await friendModel.deleteOne({ _id: existingFriend._id });
    await friendRequestModel.deleteMany({
        $or: [
            { sender: user, receiver: friendUsername },
            { sender: friendUsername, receiver: user },
        ],
    });

    res.status(200).json({
        message: 'unfriended successfully',
    });
}

module.exports = {
    sendFriendRequestController,
    acceptFriendRequestController,
    rejectFriendRequestController,
    unfriendController,
};

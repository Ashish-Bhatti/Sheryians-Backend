const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

/**
 * @controller  followUserController
 * @route       POST /api/follow/:username
 * @desc        Follow a user
 * @access      Protected
 *
 * @flow
 * 1. Get current user (follower) from req.user
 * 2. Get target user (followee) from req.params
 * 3. Check if target user exists
 * 4. Check if already following
 * 5. Create follow relationship
 */
async function followUserController(req, res) {
    // Logged-in user (who is following)
    const followerUsername = req.user.username;

    // Target user (to be followed)
    const followeeUsername = req.params.username;

    // Check if the target user exists
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername,
    });

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: 'user you are trying to follow does not exist',
        });
    }

    // Prevent user from following themselves
    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: 'you cannot follow yourself',
        });
    }

    // Check if already following
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `you are already following ${followeeUsername}`,
            follow: isAlreadyFollowing,
        });
    }

    // Create follow relationship
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    res.status(201).json({
        message: `you are now following ${followeeUsername}`,
        follow: followRecord,
    });
}

/**
 * @controller  unfollowUserController
 * @route       DELETE /api/follow/:username
 * @desc        Unfollow a user
 * @access      Protected
 *
 * @flow
 * 1. Get current user and target user
 * 2. Check if follow relationship exists
 * 3. Delete the follow record
 */
async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // Check if follow relationship exists
    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `you are not following ${followeeUsername}`,
        });
    }

    // Delete follow record
    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `you have unfollowed ${followeeUsername}`,
    });
}

module.exports = {
    followUserController,
    unfollowUserController,
};

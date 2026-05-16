const express = require('express');

const followController = require('../controllers/follow.controller');
const identifyUser = require('../middlewares/auth.middleware');

const followRouter = express.Router(); // ✅ better naming than userRouter

/**
 * @route   POST /api/follow/:username
 * @desc    Follow a user
 * @access  Protected
 *
 * @params  username - username of the user to follow
 *
 * @flow
 * - identifyUser middleware authenticates the request (via JWT)
 * - Extract current user from req.user
 * - Extract target user from req.params.username
 * - Creates a follow relationship in database
 */
followRouter.post('/:username', identifyUser, followController.followUserController);

/**
 * @route   DELETE /api/follow/:username
 * @desc    Unfollow a user
 * @access  Protected
 *
 * @params  username - username of the user to unfollow
 *
 * @flow
 * - identifyUser middleware ensures user is logged in
 * - Finds the follow relationship between current user and target user
 * - Deletes the follow record from database
 */
followRouter.delete('/:username', identifyUser, followController.unfollowUserController);

module.exports = followRouter;

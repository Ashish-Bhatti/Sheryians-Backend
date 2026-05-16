const express = require('express');

const identifyUser = require('../middlewares/auth.middleware');
const likeController = require('../controllers/like.controller');

const likeRouter = express.Router();

/**
 * @route   POST /api/like/:postId
 * @desc    Like a post
 * @access  Protected
 *
 * @params  postId - ID of the post to like
 *
 * @flow
 * - identifyUser middleware authenticates the user (via JWT)
 * - Extract user info from req.user
 * - Extract postId from req.params
 * - Calls likePostController to:
 *    → check if already liked
 *    → create like record if not
 */
likeRouter.post('/:postId', identifyUser, likeController.likePostController);

module.exports = likeRouter;

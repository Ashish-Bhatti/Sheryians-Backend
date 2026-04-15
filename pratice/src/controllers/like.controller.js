const likeModel = require('../models/like.model');
const postModel = require('../models/post.model');

/**
 * @controller  likePostController
 * @route       POST /api/like/:postId
 * @desc        Like a post
 * @access      Protected
 */
async function likePostController(req, res) {
    const username = req.user.username;
    const postId = req.params.postId;

    // Check if post exists
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({
            message: 'post not found',
        });
    }

    // Check if already liked
    const checkLike = await likeModel.findOne({
        post: postId,
        user: username,
    });

    if (checkLike) {
        return res.status(200).json({
            message: 'you already liked this post',
            like: checkLike, // ✅ better to return existing record
        });
    }

    // Create like
    const like = await likeModel.create({
        post: postId,
        user: username,
    });

    res.status(201).json({
        message: 'post liked successfully',
        like,
    });
}

module.exports = {
    likePostController,
};
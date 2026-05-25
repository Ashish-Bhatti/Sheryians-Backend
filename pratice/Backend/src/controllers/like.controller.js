const likeModel = require('../models/like.model');
const postModel = require('../models/post.model');

/**
 * @controller  likePostController
 * @route       POST /api/like/like/:postId
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

/**
 * @controller  unLikePostController
 * @route       POST /api/like/unlike/:postId
 * @desc        Unlike a post
 * @access      Protected
 */

async function unLikePostController(req, res) {
    const username = req.user.username;
    const postId = req.params.postId;

    // check if post exists
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: 'post not found'
        })
    }

    // check if like exists
    const isLiked = await likeModel.findOne({
        post : postId,
        user : username
    })

    if(!isLiked){
        return res.status(200).json({
            message: 'you have not liked this post yet'
        })
    }

    // delete like
    await likeModel.findByIdAndDelete(isLiked._id)

    res.status(200).json({
        message: 'post unliked successfully'
    })
}

module.exports = {
    likePostController,
    unLikePostController,
};
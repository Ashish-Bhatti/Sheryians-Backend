const postModel = require('../models/post.model');
const likeModel = require('../models/like.model');

const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

/**
 * Initialize ImageKit client
 * - Uses private key from environment variables
 * - Responsible for uploading media files (images here)
 */
const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * @controller  createPostController
 * @route       POST /api/posts/create
 * @desc        Upload image + create a new post
 * @access      Protected
 *
 * @flow
 * 1. Receive image from multer (stored in memory buffer)
 * 2. Convert buffer → file format using ImageKit helper (toFile)
 * 3. Upload image to ImageKit server
 * 4. Store post data in MongoDB (caption, image URL, user ID)
 */
async function createPostController(req, res) {
    // Upload image to ImageKit
    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'), // convert buffer → file
        fileName: req.file.originalname, // original filename
        folder: 'posts', // store inside "posts" folder
    });

    // Create post document in database
    const post = await postModel.create({
        caption: req.body.caption, // text caption from request body
        image: file.url, // URL returned from ImageKit
        user: req.user.id, // user ID from auth middleware
    });

    // Send success response
    res.status(201).json({
        message: 'post created successfully',
        post,
    });
}

/**
 * @controller  getPostsController
 * @route       GET /api/posts/getPost
 * @desc        Fetch all posts of logged-in user
 * @access      Protected
 *
 * @flow
 * 1. Extract user ID from request (added by auth middleware)
 * 2. Query database for posts created by that user
 * 3. Return list of posts
 */
async function getPostsController(req, res) {
    const userId = req.user.id;

    // Find all posts belonging to the logged-in user
    const posts = await postModel.find({ user: userId });

    res.status(200).json({
        message: 'post fetched successfully',
        posts,
    });
}

/**
 * @controller  getPostDetailsController
 * @route       GET /api/posts/details/:postId
 * @desc        Fetch a single post by ID (with ownership check)
 * @access      Protected
 *
 * @flow
 * 1. Get user ID from token and post ID from params
 * 2. Fetch post from database
 * 3. Check if post exists
 * 4. Verify the post belongs to the logged-in user
 * 5. Return post details if authorized
 */
async function getPostDetailsController(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    // Find post by ID
    const post = await postModel.findById(postId);

    // If post does not exist
    if (!post) {
        return res.status(404).json({
            message: 'post not found',
        });
    }

    // Check if the logged-in user is the owner of the post
    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: 'forbidden content',
        });
    }

    // Return post details
    return res.status(200).json({
        message: 'post fetched successfully',
        post,
    });
}

/**
 * @controller  getFeedController
 * @route       GET /api/posts/feed
 * @desc        Fetch the feed of posts
 * @access      Protected
 */
async function getFeedController(req, res) {
    const posts = await Promise.all(
        (await postModel.find({}).populate('user').lean()).map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: req.user.username,
                post: post._id,
            });

            post.isLiked = Boolean(isLiked);

            return post;
        })
    );
    // lean() : to get plain javascript objects instead of mongoose documents, it will remove all the mongoose specific properties and methods from the post data and return only the data that we have stored in the database
    // populate : to get user details along with the post data
    // it will return all the posts created in the database without any filter as it is a feed and we want to show all the posts to the user

    return res.status(200).json({
        message: 'feed posts fetched successfully',
        posts,
    });
}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController,
    getFeedController,
};

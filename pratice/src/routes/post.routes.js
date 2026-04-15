const express = require('express');
const postRouter = express.Router();

const postController = require('../controllers/post.controller');

const multer = require('multer');

// Configure multer to store files in memory (buffer instead of disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to authenticate and identify the user (JWT-based)
const identifyUser = require('../middlewares/auth.middleware');


/**
 * @route   POST /api/posts/create
 * @desc    Create a new post
 * @access  Protected (only authenticated users)
 *
 * @body    { caption: String, image: File }
 *
 * @notes
 * - Uses multer to handle single image upload (field name: 'image')
 * - Image is stored in memory (not saved to disk here)
 * - identifyUser middleware attaches user info to request
 */
postRouter.post(
  '/create',
  upload.single('image'),
  identifyUser,
  postController.createPostController
);


/**
 * @route   GET /api/posts/getPost
 * @desc    Get all posts for the authenticated user (or feed)
 * @access  Protected
 *
 * @notes
 * - Requires valid JWT token
 * - identifyUser ensures user is authenticated
 */
postRouter.get(
  '/getPost',
  identifyUser,
  postController.getPostsController
);


/**
 * @route   GET /api/posts/details/:postId
 * @desc    Get details of a specific post
 * @access  Protected
 *
 * @params  postId - ID of the post
 *
 * @notes
 * - Returns detailed information about the post
 * - Also verifies whether the post belongs to the requesting user
 */
postRouter.get(
  '/details/:postId',
  identifyUser,
  postController.getPostDetailsController
);


module.exports = postRouter;
const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const multer = require('multer'); // middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, we are using it to handle image uploads for posts.
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postRouter.post('/', upload.single('image'), postController.createPostController);

/**
 * GET /api/posts/ [protected]
 */
postRouter.get('/', postController.getPostController);

/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get('/details/:postId',postController.getPostDetailsContoller)

module.exports = postRouter;

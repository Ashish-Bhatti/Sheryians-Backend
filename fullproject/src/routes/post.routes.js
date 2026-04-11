const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const multer  = require('multer') // middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, we are using it to handle image uploads for posts.
const upload = multer({storage: multer.memoryStorage()})

postRouter.post('/', upload.single('image'), postController.createPostController)

module.exports = postRouter;
const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
    // console.log( req.file);

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        // file : await req.file.buffer.toString('base64'), // another way to convert buffer to base64 string
        fileName: req.file.originalname,
        folder: 'posts',
    });

    const post = await postModel.create({
        caption: req.body.caption,
        image: file.url,
        user: req.user.id,
    });

    res.status(201).json({
        message: 'post created successfully',
        post,
    });
}

async function getPostController(req, res) {
    const userId = req.user.id;

    const posts = await postModel.find({ user: userId });

    res.status(200).json({
        message: 'post fetched successfully',
        posts,
    });
}

async function getPostDetailsContoller(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: 'post not found',
        });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: 'forbidden content',
        });
    }

    return res.status(200).json({
        message: 'post fetched successfully',
        post,
    });
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsContoller,
};

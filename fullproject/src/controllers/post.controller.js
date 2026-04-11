const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
    // console.log( req.file);

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: ' unauthorized token access',
        });
    }

    let decoded = null;

    try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: 'unauthorized access',
        });
    }
    console.log(decoded);

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        // file : await req.file.buffer.toString('base64'), // another way to convert buffer to base64 string
        fileName: req.file.originalname,
        folder: 'posts',
    });

    const post = await postModel.create({
        caption: req.body.caption,
        image: file.url,
        user: decoded.id,
    });

    res.status(201).json({
        message: 'post created successfully',
        post,
    });
}

module.exports = {
    createPostController,
};

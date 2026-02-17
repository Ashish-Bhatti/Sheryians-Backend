const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
    console.log(req.body, req.file);

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        // file : await req.file.buffer.toString('base64'), // another way to convert buffer to base64 string
        fileName: req.file.originalname,
    });
    res.send(file);
}

module.exports = {
    createPostController,
}; 

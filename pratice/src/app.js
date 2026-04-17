const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json()); // middleware to read json data from req.body
app.use(cookieParser()); // to use cookies

// require routes
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const followRouter = require('./routes/follow.routes');
const likeRouter = require('./routes/like.routes');
const friendRouter = require('./routes/friend.rotues');

// using routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/follow', followRouter);
app.use('/api/like', likeRouter);
app.use('/api/friends', friendRouter);

module.exports = app;

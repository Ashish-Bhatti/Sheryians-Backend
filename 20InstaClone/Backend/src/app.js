const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
app.use(express.json()); // middleware to read json data from req.body
app.use(cookieParser()); // to use cookies
app.use(cors({
    credentials: true,
    origin : 'http://localhost:5173' // it allows us to set cookies from this origin (frontend) to the backend
})); // to allow cross-origin requests

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

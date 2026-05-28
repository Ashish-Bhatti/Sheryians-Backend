const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

const authRoute = require('../src/routes/auth.route');
const songRoute = require('../src/routes/song.route');

app.use('/api/auth', authRoute);
app.use('/api/songs', songRoute);

module.exports = app;

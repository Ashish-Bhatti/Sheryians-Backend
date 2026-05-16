const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hello world');
});

const authRouter = require('./routes/auth.routes');

app.use('/api/auth', authRouter);

module.exports = app;

const express = require('express');
const authRouter = require('../src/routes/auth.routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('hello there');
});

module.exports = app;

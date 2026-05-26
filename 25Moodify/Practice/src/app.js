const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require('../src/routes/auth.routes');

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    return res.send('hello i am here');
});

module.exports = app;

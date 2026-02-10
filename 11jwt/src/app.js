/*
create server
config server
 */

const express = require('express');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());

// it means that all the routes in authRouter will be prefixed with /api/auth
app.use('/api/auth', authRouter);


// app.get('/', (req, res) => {
//     res.send('hello there');
// });

module.exports = app;

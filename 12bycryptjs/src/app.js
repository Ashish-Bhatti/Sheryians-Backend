/*
server create
server config
 */

const express = require('express');
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
// to recieve cookies from client side to server/us
// we need to require it before routes
app.use(cookieParser())
// it means that all the routes in authRouter will be prefixed with /api/auth
app.use('/api/auth', authRouter)

module.exports = app;

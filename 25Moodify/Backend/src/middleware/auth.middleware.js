const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache')

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'token not found',
        });
    }

    const checkToken = await redis.get(token);

    if (checkToken) {
        return res.status(401).json({
            message: 'token expired',
        });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(400).json({
            message: 'Token expired',
        });
    }
    req.user = decoded;
    next();
}

module.exports = authUser;

// we use this middleware to verify user by token

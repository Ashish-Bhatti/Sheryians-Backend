const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const redis = require('../config/cache')

async function userAuth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(409).json({
            message: 'token not found',
        });
    }

    const checkToken = await redis.get(token)

    if(checkToken){
        return res.status(401).json({
            message : 'invalid request'
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(409).json({
            message: 'invalid token',
        });
    }

    req.user = decoded;
    next();
}

module.exports = userAuth;

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcrypt');
const redis = require('../config/cache');

async function registerController(req, res) {
    const { username, email, password } = req.body;

    // check user exists
    const checkUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (checkUser) {
        return res.status(409).json({
            message: 'user already exists',
        });
    }

    // hash password
    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
    });

    const token = jwt.sign(
        {
            id: user._id,
            username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    return res.status(201).json({
        message: 'registered successfully',
        user,
    });
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    // check user
    const checkUser = await userModel
        .findOne({
            $or: [{ username }, { email }],
        })
        .select('+password');

    if (!checkUser) {
        return res.status(409).json({
            message: 'invalid credentials',
        });
    }

    // check password
    const checkPassword = await bcryptjs.compare(password, checkUser.password);

    if (!checkPassword) {
        return res.status(409).json({
            message: 'invalid credentials',
        });
    }

    const token = jwt.sign(
        {
            id: checkUser._id,
            username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    return res.status(200).json({
        message: 'logged in successfully',
        checkUser,
    });
}

async function getMeController(req, res) {
    const userID = req.user.id;

    //find user
    const user = await userModel.findById(userID);

    if (!user) {
        return res.status(409).json({
            message: 'user not found',
        });
    }

    return res.cookie(200).json({
        message: 'user fetched successfully',
        user,
    });
}

async function logoutController(req, res) {
    const token = req.cookies.token;

    await redis.set(token, Date.now(), 'EX', 60 * 60);

    res.clearCookie('token');

    return res.status(200).json({
        message: 'logged out successfully',
    });
}
module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController,
};

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');

async function registerController(req, res) {
    const { username, email, password } = req.body;

    // Check if user already exists (username or email)
    const checkUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (checkUser) {
        return res.status(409).json({
            message: 'User already exists',
        });
    }

    // hash password before saving (security best practice)
    const hashPassword = await bcrypt.hash(password, 10);

    // create new user document
    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
    });

    const token = jwt.sign(
        {
            id: user._id,
            username: username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    ); // token valid of 3 days

    res.cookie('token', token);

    res.status(201).json({
        message: 'user registered successfully',
        user,
    });
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    // check user exists or not
    const user = await userModel
        .findOne({
            $or: [{ username }, { email }],
        })
        .select('+password'); // explicitly include password field for authentication

    if (!user) {
        res.status(409).json({
            message: 'Invalid Credentials',
        });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(401).json({
            message: 'Invalid Credentials',
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    );

    res.cookie('token', token);

    res.status(200).json({
        message: 'logged in successfully',
        user,
    });
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: 'user fetched successfully',
        user,
    });
}

async function logoutController(req, res) {
    const token = req.cookies.token;

    await redis.set(token, Date.now(), 'EX', 3 * 24 * 60 * 60); // Expire in 3 days

    res.clearCookie('token');

    res.status(200).json({
        message: 'logged out successfully',
    });
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController,
};

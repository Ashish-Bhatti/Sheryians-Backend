const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const checkUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (checkUser) {
        return res.status(409).json({
            message: 'user already exists',
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        bio,
        profileImage,
    });

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(201).json({
        message: 'user register successfully',
        user: {
            id: user._id,
            email: user.email,
            userName: user.userName,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
}

async function loginController(req, res) {
    const { email, username, password } = req.body;

    // Find user by email OR username
    const checkUser = await userModel.findOne({
        $or: [{ email }, { username }],
    });

    // If user not found
    if (!checkUser) {
        return res.status(401).json({
            message: 'wrong credentials',
        });
    }

    // Compare entered password with hashed password
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
        return res.status(401).json({
            message: 'wrong credentials',
        });
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            id: checkUser._id,
            username: checkUser.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    // Store token in cookies
    res.cookie('token', token);

    // Send response
    res.status(200).json({
        message: 'successfully logged in',
    });
}

module.exports = {
    registerController,
    loginController,
};

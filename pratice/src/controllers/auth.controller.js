const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @controller  registerController
 * @route       POST /api/auth/register
 * @desc        Register a new user
 * @access      Public
 *
 * @flow
 * 1. Extract user data from request body
 * 2. Check if user already exists (by username OR email)
 * 3. Hash password using bcrypt
 * 4. Create user in database
 * 5. Generate JWT token
 * 6. Store token in cookies
 * 7. Return user data
 */
async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    // Check if user already exists (username or email)
    const checkUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (checkUser) {
        return res.status(409).json({
            message: 'user already exists',
        });
    }

    // Hash password before saving (security best practice)
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        bio,
        profileImage,
    });

    // Generate JWT token
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // token valid for 1 day
    );

    // Store token in cookies (for authentication)
    res.cookie('token', token);

    // Send response
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

/**
 * @controller  loginController
 * @route       POST /api/auth/login
 * @desc        Authenticate user and return token
 * @access      Public
 *
 * @flow
 * 1. Extract credentials (email/username + password)
 * 2. Check if user exists
 * 3. Compare password using bcrypt
 * 4. Generate JWT token
 * 5. Store token in cookies
 * 6. Return success response
 */
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

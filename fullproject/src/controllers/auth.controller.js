const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController (req, res) {
    const { email, userName, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { userName }],
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            msg: 'user already exist' + (isUserAlreadyExists.email === email ? 'email already exists' : 'username already exists'),
        });
    }

    const hashPassword = await bcrypt.hash(password, 10); // using bcrypt to hash password with salt rounds of 10, which is more secure than sha256 for password hashing

    const user = await userModel.create({ email, userName, password: hashPassword, bio, profileImage });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token);

    res.status(201).json({
        msg: 'register successfully',
        user: {
            id: user._id,
            email: user.email,
            userName: user.userName,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
}

async function loginController (req, res){
    const { userName, email, password } = req.body;

    const checkUser = await userModel.findOne({
        $or: [{ email: email }, { userName: userName }],
    });

    if (!checkUser) {
        // For wrong login credentials, correct status is: 401 Unauthorized
        return res.status(401).json({
            msg: 'wrong credentials',
        });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password); // using bcrypt to compare password, which is more secure than sha256 for password hashing

    if (!checkPassword) {
        return res.status(401).json({
            msg: 'wrong credentials',
        });
    }

    const token = jwt.sign(
        {
            id: checkUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(200).json({
        msg: 'successfully logged in',
    });
}

module.exports = {
    registerController,
    loginController
}
const userModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

async function registerController (req, res) {
    const { email, userName, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { userName }],
    });

    if (isUserAlreadyExists) {
        return res.send(409).json({
            msg: 'user already exist' + (isUserAlreadyExists.email === email ? 'email already exists' : 'username already exists'),
        });
    }

    const hashPassword = crypto.createHash('sha256').update(password).digest('hex');

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

    const checkPassword = checkUser.password === crypto.createHash('sha256').update(password).digest('hex');

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
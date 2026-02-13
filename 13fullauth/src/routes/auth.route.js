const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
        return res.status(409).json({
            message: 'user already exists with this email id',
        });
    }

    const hashPassword = crypto.createHash('md5').update(password).digest('hex');

    const user = await userModel.create({ name, email, password: hashPassword });
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('token', token);

    res.status(200).json({
        msg: 'successfully registered',
        user,
    });
});

authRouter.get('/get-me', async (req, res) => {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        msg: 'user exist',
        user,
    });
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {
        return res.status(409).json({
            msg: 'wrong email id ',
        });
    }

    const checkPassword = checkUser.password === crypto.createHash('md5').update(password).digest('hex');

    if (!checkPassword) {
        return res.status(409).json({
            msg: 'wrong credentials',
        });
    }

    const token = jwt.sign(
        {
            id: checkUser._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie('token', token);

    res.status(200).json({
        msg: 'logged in',
    });
});

module.exports = authRouter;

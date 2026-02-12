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

    const hashPassword = crypto.createHash('md5').update(password).digest('hex')
    const user = await userModel.create({ name, email, password : hashPassword });

    // create token
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET
    );

    res.cookie('jwt_token', token);

    res.status(200).json({
        message: 'successfully registered',
        user,
        token,
    });
});

authRouter.post('/protected', (req, res) => {
    console.log(req.cookies);
    const cookies = req.cookies;
    res.status(200).json({
        msg: 'this is a protected route',
        cookies,
    });
});

// these are also known us controller functions
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            msg: 'user not found with this email id',
        });
    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordMatch) {
        return res.status(401).json({
            msg: 'invalid credentials',
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie('jwt_toekn', token);

    res.status(200).json({
        msg: 'user logged in successfully',
        user
    });
});

module.exports = authRouter;

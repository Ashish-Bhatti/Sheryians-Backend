const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

//**  /api/auth/register
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    console.log(checkUser);
    if (checkUser) {
        return res.status(400).json({
            msg: 'With this email user account already exists',
        });
    }

    const user = await userModel.create({ name, email, password });

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET
    );

    res.cookie('jwt_token', token);

    res.status(201).json({
        msg: 'user register successfully',
        user,
        token,
    });
});

module.exports = authRouter;

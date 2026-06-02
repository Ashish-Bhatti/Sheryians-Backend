import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { check } from 'express-validator';

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */
async function register(req, res) {
    const { username, email, password } = req.body;

    const checkUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (checkUser) {
        // 400 Bad Request : Client sent invalid data , Validation errors, missing fields, malformed request
        return res.status(400).json({
            message: 'user already exists',
            success: false,
            err: 'user already exists',
        });
    }

    const user = await userModel.create({ username, email, password });
    res.status(201).json({
        message: 'User registered successfully',
        success: true,
        user,
    });

    const emailVerificationToken = jwt.sign({
        email: user.email,
    },process.env.JWT_SECRET,{expiresIn : '3d'})
}

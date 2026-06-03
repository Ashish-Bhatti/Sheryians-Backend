import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */
export async function register(req, res) {
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

    const emailVerificationToken = jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    );

    await sendEmail({
        to: user.email,
        subject: 'Email Verification',
        html: `<p>Click <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">here</a> to verify your email.</p>`,
        text: `Copy and paste the following link in your browser to verify your email: http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}`,
    });

    // 201 - Created : The request has been fulfilled and has resulted in one or more new resources being created.
    res.status(201).json({
        message: 'User registered successfully',
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
        },
    });
}

/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */

/*
400 = Bad Request     -> Wrong input/data
401 = Unauthorized    -> Not logged in
 */
export async function login(req, res) {
    const { email, password } = req.body;

    // checkUser

    const user = await userModel.findOne({ email }).select('+password');
    /* You use an object because Mongoose queries are based on field-value pairs.
    userModel.findOne({email: email});
    shorthand - userModel.findOne({email})
     */

    // 400 Bad Request : Invalid Data
    if (!user) {
        return res.status(400).json({
            message: 'wrong credentails',
            success: false,
            err: 'user not found',
        });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: 'wrong credentials',
            success: false,
            err: 'incorrect password',
        });
    }

    if (!user.isVerified) {
        return res.status(400).json({
            message: 'please verify your email before log in',
            success: false,
            err: 'email not verified',
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('token', token);

    return res.status(200).json({
        message: 'login successfully',
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
}

/**
 * @desc Get current logged in user's details
 * @route GET /api/auth/get-me
 * @access Private
 */

export async function getMe(req, res) {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    // 404 - invalid url or resource does not exists
    if (!user) {
        return res.status(404).json({
            message: 'user not found',
            success: false,
            err: 'user not found',
        });
    }

    // 200 - success / request was successfull
    return res.status(200).json({
        message: 'user details fetched successfully',
        success: true,
        user,
    });
}

/**
 * @desc Verify email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */
export async function verifyEmail(req, res) {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({
            message: 'Token is required',
            success: false,
            err: 'Token is required',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email });

        // 400 Bad Request : Client sent invalid data , Validation errors, missing fields, malformed request
        if (!user) {
            return res.status(400).json({
                message: 'Invalid token',
                success: false,
                err: 'Invalid token',
            });
        }

        // 400 Bad Request : Invalid data, Validation errors
        if (user.isVerified) {
            return res.status(400).json({
                message: 'Email already verified',
                success: false,
                err: 'Email already verified',
            });
        }

        user.isVerified = true;

        // user.save() is used to save the changes made to the user document in the database. It is an asynchronous operation that returns a promise. By using await, we ensure that the code waits for the save operation to complete before proceeding to the next line of code. This is important because we want to make sure that the user's email verification status is updated in the database before sending the response back to the client.
        await user.save();

        // 200 OK : The request has succeeded. The meaning of the success depends on the HTTP method: GET : The resource has been fetched and is transmitted in the message body.
        return res.status(200).json({
            message: 'Email verified successfully',
            success: true,
        });
    } catch (err) {
        console.error('Error verifying email: ', err);
        return res.status(400).json({
            message: 'Invalid or expired token',
            success: false,
            err: 'Invalid or expired token',
        });
    }
}

const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/auth.controller');


/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 *
 * @body    {
 *   username: String,
 *   email: String,
 *   password: String
 * }
 *
 * @flow
 * - Receives user data from client
 * - Calls registerController to:
 *    → validate input
 *    → hash password
 *    → create user in database
 */
authRouter.post('/register', authController.registerController);


/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and log them in
 * @access  Public
 *
 * @body    {
 *   email: String,
 *   password: String
 * }
 *
 * @flow
 * - Receives login credentials
 * - Calls loginController to:
 *    → verify email & password
 *    → generate JWT token
 *    → send token (usually via cookies or response)
 */
authRouter.post('/login', authController.loginController);


module.exports = authRouter;
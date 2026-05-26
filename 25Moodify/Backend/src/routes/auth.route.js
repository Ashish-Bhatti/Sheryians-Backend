const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/auth.controllers');
const authMiddleware = require('../middleware/auth.middleware');

authRoute.post('/register', authController.registerController);
authRoute.post('/login', authController.loginController);
authRoute.get('/get-me', authMiddleware, authController.getMeController);
authRoute.get('/logout', authController.logoutController);

module.exports = authRoute;

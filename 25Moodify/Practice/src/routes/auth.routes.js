const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post('/register', authController.registerController);
authRouter.post('/login', authController.loginController);
authRouter.get('/get-me', authMiddleware, authController.getMeController);

module.exports = authRouter;

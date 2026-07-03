import { Router } from 'express';
import { validateRegisterUser, validateLoginUser } from '../validator/auth.validator.js';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegisterUser, register);

authRouter.post('/login', validateLoginUser, login);

authRouter.post('/get-me', authenticateUser, getMe);

export default authRouter;

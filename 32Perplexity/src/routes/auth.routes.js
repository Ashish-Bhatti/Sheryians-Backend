import { Router } from 'express';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';
import authUser from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register',registerValidator,register)
import { Router } from 'express';
import { register } from '../controllers/auth.controllers.js';
import {registerValidation} from '../validation/auth.validator.js';

const authRoute = Router();

authRoute.post('/register', registerValidation, register);

export default authRoute;

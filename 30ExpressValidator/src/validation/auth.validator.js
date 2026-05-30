import { body, validationResult } from 'express-validator';

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({
        errors: errors.array(),
    });
};

export const registerValidation = [
    body('username').isString().isLength({min : 4}).withMessage('username should be a String'),
    body('email').isEmail().withMessage('enter a vaild email'),
    body('password').isStrongPassword().withMessage('enter a strong password'),
    validate,
];

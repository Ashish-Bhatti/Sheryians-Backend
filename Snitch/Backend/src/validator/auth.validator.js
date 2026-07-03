import { body, validationResult } from 'express-validator';

//2nd it validate both login and register and if any validation have and error it gives an array of errors otherwise goes to next 
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    next();
};
// 1st it checks all the format and store the error
export const validateRegisterUser = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('contact')
        .notEmpty()
        .withMessage('Contact is required')
        .matches(/^\d{10}$/)
        .withMessage('Contact must be a 10-digit number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname').notEmpty().withMessage('Full name is required').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    // body('isSeller').isBoolean().withMessage('isSeller must be a boolean value'),
    validateRequest,
];

export const validateLoginUser = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
]
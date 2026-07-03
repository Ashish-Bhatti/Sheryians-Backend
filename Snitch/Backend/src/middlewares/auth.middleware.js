import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import userModel from '../models/user.model.js';

export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            // 401 - Unauthorized
            message: 'unauthorized access',
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: 'unauthorized access',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'unauthorized access',
        });
    }
};

export const authenticateSeller = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'unauthorized access',
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: 'unauthorized access',
            });
        }

        if (user.role !== 'seller') {
            return res.status(403).json({
                // 403 - forbidden - the server understood your request but refuses to fulfill it
                message: 'forbidden',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'unauthorized access',
        });
    }
};

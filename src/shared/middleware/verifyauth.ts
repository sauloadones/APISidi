import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppError from '../errors/AppError';
import authConfig from '../../config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    email: string;
}

interface CustomRequest extends Request {
    user?: {
        email: string;
    };
}

export const authMiddleware = (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
): void => {
    const { authorization } = req.headers;
    console.log('Authorization Header:', authorization);

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new AppError('JWT token is missing or malformed', 401));
    }

    const token = authorization.split(' ')[1];
    console.log('Extracted Token:', token);

    try {
        const decoded = jwt.verify(token, authConfig.jwt.secret) as ITokenPayload;
        console.log('Decoded Token:', decoded);

        req.user = {
            email: decoded.email,
        };

        return next();
    } catch (err) {
        console.error('Token Verification Error:', err);
        return next(new AppError('Invalid JWT token', 401));
    }
};



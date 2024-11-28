import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;

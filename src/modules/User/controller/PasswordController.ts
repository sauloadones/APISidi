import { Request, Response } from 'express';
import AppDataSource from '../../../db/data-source';
import User from '../entity/Entities';
import AppError from '../../../shared/errors/AppError';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import auth from '../../../config/auth';

import { encrypt } from '../encryptPassword/PasswordEncryption';

class PasswordController {
    requestPasswordReset = async (req: Request, res: Response): Promise<Response> => {
        const { email } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const token = jwt.sign({ userId: user.id }, auth.jwt.secret, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset email sent' });
    };

    resetPassword = async (req: Request, res: Response): Promise<Response> => {
        const { token, newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, auth.jwt.secret) as { userId: string };

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: decoded.userId } });

            if (!user) {
                throw new AppError('User not found', 404);
            }

            user.password = await encrypt(newPassword);

            await userRepository.save(user);

            return res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            throw new AppError(`Invalid or expired token ${error} `, 400);
        }
    };
}





export default PasswordController;

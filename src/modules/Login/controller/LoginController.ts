import { Request, Response, NextFunction } from 'express';
import createLoginValidator from '../../User/validator/LoginUserValidator';
import LoginService from '../service/LoginService';
import AppError from '../../../shared/errors/AppError';

class LoginController {
    private loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService =  loginService;
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { error } = createLoginValidator.validate(req.body);
            if (error) {
                throw new AppError(`${error.message}`, 400);
            }

            const loginResult = await this.loginService.login(req.body);
             res.status(200).json(loginResult);
        } catch (error) {
            if (error instanceof AppError) {
                console.error('Known Error:', error.message);
                res.status(error.statusCode).json({ message: error.message });
            } else {
                console.error('Unexpected Error:', error);
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    };
}

export default LoginController;

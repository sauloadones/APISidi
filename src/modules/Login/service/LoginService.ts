import User from '../../User/entity/Entities';
import AppDataSource from '../../../db/data-source';
import ILoginService from '../../interfaces/ILoginService';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginService {
    login = async (loginData: ILoginService): Promise<{ token: string }> => {
        const userRepository = AppDataSource.getRepository(User);
        const { email, password } = loginData;

        if(!email) {
            throw new AppError("Email is required", 409)
        }
        const existingUser = await userRepository.findOne({ where: { email } });
        if(!existingUser) {
            throw new AppError("Should be a valid a valid email", 409);
        }
   

        const isPasswordValid = await compare(password, existingUser.password);
        if (isPasswordValid == false) {
            throw new AppError('Email or password not found', 409);
        }

        const token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            authConfig.jwt.secret,
            { expiresIn: authConfig.jwt.expiresIn }
        );

        return { token };
    }
}

export default LoginService;

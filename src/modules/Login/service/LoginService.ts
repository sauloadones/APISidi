import User from "../../User/entity/Entities";
import AppDataSource from "../../../db/data-source";
import ILoginService from "../../interfaces/ILoginService";
import AppError from "../../../shared/errors/AppError";
import { compare } from "../../User/encryptPassword/PasswordEncryption";
import auth from "../../../config/auth";
import jwt from "jsonwebtoken";

class LoginService {
    login = async (loginData: ILoginService): Promise<{ token: string }> => {
        const userRepository = AppDataSource.getRepository(User) 

        const { email, password} = loginData
        
        const existingUser = await userRepository.findOne({
            where: {email: email}
        })

        if(!existingUser) {
            throw new AppError('Email not found', 409)
        }
        console.log(existingUser.password)
        const isPasswordValid = await compare(existingUser.password, password)
        
        console.log(isPasswordValid)
        if(!isPasswordValid) {
            throw new AppError('Invalid password', 401)
        }
        
        const token = jwt.sign({ userId: existingUser.id }, auth.jwt.secret, { expiresIn: '1h'})

        
        return { token }
    }
}

export default LoginService
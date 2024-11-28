import { Request, Response} from 'express'
import AppDataSource from '../../../db/data-source'
import User from '../../User/entity/Entities'
import createLoginValidator from '../../User/validator/LoginUserValidator'
import LoginService from '../service/LoginService'
import AppError from '../../../shared/errors/AppError'
export class LoginController {
  
        userRepository = AppDataSource.getRepository(User)
    constructor(
        private loginUserService: LoginService,

    ){}

    

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { error } = createLoginValidator.validate(req.body)

            if(error) {
                throw new AppError(`${error.message}`)
            }

            const LoginResult = await this.loginUserService.login(req.body)

            res.status(201).json(LoginResult)

            

        } catch (error: unknown) { 
            if (error instanceof Error) { 
                console.error('Error creating user:', error); 
                res.status(409).json({ message: error.message }); 
            } else { 
                console.error('Unexpected error:', error); 
                res.status(500).json({ message: error}); } 
            }

    }
}
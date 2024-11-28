import { Request, Response } from 'express';
import AppDataSource from '../../../db/data-source';
import User from '../entity/Entities';
import CreateUserService from '../services/CreateUserService';
import AppError from '../../../shared/errors/AppError';
import createUserValidator from '../validator/CreateUserValidator';

export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    constructor(
        private createUserService: CreateUserService,
    ) {}

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { error } = createUserValidator.validate(req.body);

            if (error) {
                throw new AppError(error.message, 400);  
            }

            const newUser = await this.createUserService.createUser(req.body);
            return res.status(201).json(newUser);  

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating user:', error.message, error.stack);
                return res.status(409).json({ message: error.message });  
            } else {
                console.error('Unexpected error:', error);
                return res.status(500).json({ message: error });  
            }
        }
    };
}

import { Router } from 'express';
import { UserController } from '../controller/UserController';
import UserService from '../services'; // Ensure this import path is correct


const userRoutes = Router();

const userController = new UserController(
    new UserService.CreateUserService(),
);

userRoutes.post('/', async (req, res, next) => {
    try {
        await userController.create(req, res);
    } catch (error) {
        next(error); // Ensure any errors are passed to the error handling middleware
    }
});


export default userRoutes;

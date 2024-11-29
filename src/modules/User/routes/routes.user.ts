import { Router } from 'express';
import { UserController } from '../controller/UserController';
import UserService from '../services'; // Ensure this import path is correct
import { authMiddleware } from '../../../shared/middleware/verifyauth';


const userRoutes = Router();

const userController = new UserController(
    new UserService.CreateUserService(),
    new UserService.ShowUserService(),
);




userRoutes.post('/create', async (req, res, next) => {
    try {
        await userController.create(req, res);
    } catch (error) {
        next(error); 
    }
});
userRoutes.get('/getById', authMiddleware, async (req, res, next) => {
    try {
        await userController.getById(req, res);
    } catch (error) {
        next(error); 
    }
});

export default userRoutes;

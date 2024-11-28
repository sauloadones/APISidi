import { Router } from 'express';
import { LoginController } from '../controller/LoginController';
import Service from '../service';

const loginRoutes = Router();

const loginController = new LoginController(
    new Service.LoginService(),
)

loginRoutes.post('/', loginController.login);



export default loginRoutes
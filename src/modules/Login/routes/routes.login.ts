import { Router } from 'express';
import LoginController from '../controller/LoginController';
import LoginService from '../service/LoginService';

const loginRoutes = Router();

const loginController = new LoginController(new LoginService());

loginRoutes.post('/', loginController.login);

export default loginRoutes;


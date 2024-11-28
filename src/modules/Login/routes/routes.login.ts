import { Router } from 'express';
import { LoginController } from '../controller/LoginController';
import Service from '../service';

const loginRoutes = Router();

const loginController = new LoginController(
    new Service.LoginService(),
)
loginRoutes.get('/', function(req, res, next) {
    res.send('Index!');
});
loginRoutes.post('/', loginController.login);

export default loginRoutes
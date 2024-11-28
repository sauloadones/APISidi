import { Router } from 'express';
import PasswordController from '../controller/PasswordController';

const passwordController = new PasswordController();

const passwordRoutes = Router();

passwordRoutes.post('/request-reset', passwordController.requestPasswordReset.bind);
passwordRoutes.post('/reset-password', passwordController.resetPassword.bind);

export default passwordRoutes;

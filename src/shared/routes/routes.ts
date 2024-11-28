import { Router } from 'express';
import userRoutes from '../../modules/User/routes/routes.user';
import loginRoutes from '../../modules/Login/routes/routes.login';

const routes = Router();





routes.use('/login', loginRoutes)
routes.use('/user', userRoutes);
export default routes;
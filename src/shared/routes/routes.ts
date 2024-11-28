import { Router } from 'express';
import userRoutes from '../../modules/User/routes/routes.user';
import loginRoutes from '../../modules/Login/routes/routes.login';
import checkInRoutes from '../../modules/CheckIn/routes/checkin.routes';
import passwordRoutes from '../../modules/User/routes/router.resetpassword';

const routes = Router();

routes.use('/login', loginRoutes)
routes.use('/user', userRoutes);
routes.use('/checkin', checkInRoutes)
routes.use('/reset', passwordRoutes)

export default routes;
import { Router } from 'express';
import userRoutes from '../../modules/User/routes/routes.user';
import loginRoutes from '../../modules/Login/routes/routes.login';
import checkInRoutes from '../../modules/CheckIn/routes/checkin.routes';
import passwordRoutes from '../../modules/User/routes/router.resetpassword';
import { authMiddleware } from '../middleware/verifyauth';
const routes = Router();





routes.use('/login', loginRoutes)

routes.use('/user', userRoutes);
routes.use('/checkin', authMiddleware, checkInRoutes)
routes.use('/reset', authMiddleware, passwordRoutes)
export default routes;
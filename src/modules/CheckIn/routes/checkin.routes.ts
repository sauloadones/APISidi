import { Router } from 'express';
import CheckInController from '../controller/CheckInController';
import AppError from '../../../shared/errors/AppError';

const checkInController = new CheckInController();
const checkInRoutes = Router();

checkInRoutes.post('/', async (req, res) => {
    try {
        await checkInController.createCheckIn(req, res);
    } catch (error) {
        throw new AppError(`${error}`, 500);  // Pass errors to the error-handling middleware
    }
});

checkInRoutes.get('/', async (req, res) => {
    try {
        await checkInController.getCheckIns(req, res);
    } catch (error) {
        throw new AppError(`${error}`, 500);  // Pass errors to the error-handling middleware
    }
});

export default checkInRoutes;

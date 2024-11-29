import { Router } from 'express';
import CheckInController from '../controller/CheckInController';
import AppError from '../../../shared/errors/AppError';

const checkInController = new CheckInController();
const checkInRoutes = Router();

checkInRoutes.post('/checkin', async (req, res) => {
    try {
        await checkInController.createCheckIn(req, res);
    } catch (error) {
        throw new AppError(`${error}`, 500);  
    }
});

checkInRoutes.patch('/checkout/:id', async (req, res) => {
    try {
        await checkInController.updateCheckOut(req, res);
    } catch (error) {
        throw new AppError(`${error}`, 500);  
    }
});

checkInRoutes.patch('/is/:id', async (req, res) => {
    try {
        await checkInController.updateIntervalEntrada(req, res);
    } catch (error) {
        throw new AppError(`${error}`, 500);  
    }
});

checkInRoutes.patch('/ie/:id', async (req, res) => {
    try {
        await checkInController.updateIntervalFinal(req, res);
    } catch (error) {
        throw new AppError(`${error}`, 500);  
    }
});

checkInRoutes.get('/:id', async (req, res) => {
    try {
        await checkInController.getCheckInByUserId(req, res);
    } catch (error) {
        throw new AppError(`${error}`, 500);  
    }
});



export default checkInRoutes;

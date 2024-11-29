import { Request, Response, NextFunction } from 'express';
import CheckInPontoService from '../service/CheckInPontoService';
import Check
import AppError from '../../../shared/errors/AppError';

class CheckInController {
    private checkInPontoService: CheckInPontoService;
    private checkOutService: CheckOutService;

    constructor() {
        this.checkInService = new CheckInService();
    }

    createCheckIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const checkIn = await this.checkInService.createCheckIn(req.body);
            res.status(201).json(checkIn);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }

    getCheckInById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const checkIn = await this.checkInService.getCheckInById(Number(id));
            res.status(200).json(checkIn);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }

    updateCheckOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const checkOutData = req.body;
            const updatedCheckIn = await this.checkInService.updateCheckOut(Number(id), checkOutData);
            res.status(200).json(updatedCheckIn);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }
}

export default CheckInController;


export default CheckInController;





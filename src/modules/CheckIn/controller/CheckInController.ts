import { Request, Response, NextFunction } from 'express';
import CheckInPontoService from '../service/CheckInPontoService';

import AppError from '../../../shared/errors/AppError';
import CheckOutService from '../service/CheckOutPontoService';
import intervalInicioService from '../service/IntervalStartService';
import intervalFinalService from '../service/IntervalEndService';
import getCheckInById from '../service/GetService';
class CheckInController {
    private checkInPontoService: CheckInPontoService;
    private checkOutService: CheckOutService;
    private IntervalInicioService: intervalInicioService;
    private IntervalFinalService: intervalFinalService
    private getCheckInById: getCheckInById
    constructor() {
        this.checkInPontoService = new CheckInPontoService();
        this.checkOutService = new CheckOutService();
        this.IntervalInicioService = new intervalInicioService();
        this.IntervalFinalService = new intervalFinalService();
        this.getCheckInById = new getCheckInById();
    }

    createCheckIn = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params
            const checkIn = await this.checkInPontoService.createCheckIn(req.body, userId);
            res.status(201).json(checkIn);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }

    // getCheckInById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const { id } = req.body;
    //         const checkIn = await this.checkInPontoService(Number(id));
    //         res.status(200).json(checkIn);
    //     } catch (error) {
    //         if (error instanceof AppError) {
    //             res.status(error.statusCode).json({ message: error.message });
    //         } else {
    //             res.status(500).json({ message: 'An unexpected error occurred' });
    //         }
    //     }
    // }

    updateCheckOut = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedCheckOut = await this.checkOutService.updateCheckOut(Number(id));
            res.status(200).json(updatedCheckOut);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }
    updateIntervalEntrada = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedIntervalEntrada = await this.IntervalInicioService.updateIntervalStart(Number(id));
            res.status(200).json(updatedIntervalEntrada);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }
    updateIntervalFinal = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedSaidaService = await this.IntervalFinalService.updateIntervalEnd(Number(id));
            res.status(200).json(updatedSaidaService);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }
    getCheckInByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const checkIns = await this.getCheckInById.getCheckInByUserId(userId)
            res.status(200).json(checkIns)
        }catch (error) {
            if(error instanceof AppError) {
                res.status(error.statusCode).json({message: error.message})

            } else { 
                res.status(500).json({message: 'An unexpected error occured'})
            }
        }
    }
}

export default CheckInController;








import { Request, Response} from 'express';
import AppDataSource from '../../../db/data-source';
import CheckIn from '../entity/CheckInEntity';
import User from '../../User/entity/Entities';
import AppError from '../../../shared/errors/AppError';

class CheckInController {
    createCheckIn = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userId } = req.body;

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const checkInRepository = AppDataSource.getRepository(CheckIn);

            const newCheckIn = checkInRepository.create({
                userId,
                user,
                timestamp: new Date(),
            });

            await checkInRepository.save(newCheckIn);

            return res.status(201).json(newCheckIn);
        } catch (error) {
            throw new AppError(`Error registering check-in ${error}`, 500);
        }
    };

    getCheckIns = async (req: Request, res: Response): Promise<Response> => {
        try {
            const checkInRepository = AppDataSource.getRepository(CheckIn);

            const checkIns = await checkInRepository.find({ relations: ['user'] });

            return res.status(200).json(checkIns);
        } catch (error) {
            throw new AppError(`Error fetching check-ins ${error}`, 500);
        }
    };
}

export default CheckInController;

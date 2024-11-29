import AppDataSource from '../../../db/data-source';
import baterponto from '../entity/baterponto';
import AppError from '../../../shared/errors/AppError';

class getCheckInById {

    async getCheckInByUserId(userId: string): Promise<baterponto[]> {
        const baterpontoRepository = AppDataSource.getRepository(baterponto);
        const checkIns = await baterpontoRepository.find({ where: {userId: userId}});
        console.log(userId)
        console.log(checkIns)
        if (!checkIns.length) {
            throw new AppError('Check-ins not found', 404);
        }

        return checkIns;
    }

    // Other existing methods...
}

export default getCheckInById;

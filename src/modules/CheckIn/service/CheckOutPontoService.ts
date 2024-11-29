import AppDataSource from '../../../db/data-source';
import baterponto from '../entity/baterponto';
import AppError from '../../../shared/errors/AppError';
import { formatDateToPTBR, formatDateTimeToBrazilTimeZone } from '../../User/validator/baterPontoValidator';

class CheckOutService {


    async updateCheckOut(id: number): Promise<baterponto> {
        const baterpontoRepository = AppDataSource.getRepository(baterponto);
        const baterPonto = await baterpontoRepository.findOne({ where: { id }, relations: ['user'] });

        if (!baterPonto) {
            throw new AppError('CheckIn not found', 404);
        }

        baterPonto.checkOutData = formatDateToPTBR(new Date());
        baterPonto.checkOutHorario = formatDateTimeToBrazilTimeZone(new Date());

        await baterpontoRepository.save(baterPonto);
        return baterPonto;
    }
}

export default CheckOutService;

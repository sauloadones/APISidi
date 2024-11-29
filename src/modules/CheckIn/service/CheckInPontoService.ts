import {formatDateToPTBR, formatDateTimeToBrazilTimeZone} from '../../User/validator/baterPontoValidator';
import baterponto from '../entity/baterponto';
import AppDataSource from "../../../db/data-source";

class CheckInPontoService {
    async createCheckIn(baterpontoData: baterponto, userId: string): Promise<baterponto> {
        const baterpontoRepository = AppDataSource.getRepository(baterponto);

        baterpontoData.userId = userId
        baterpontoData.checkInData = formatDateToPTBR(new Date());
        baterpontoData.checkOutData = ''
        baterpontoData.intervalEntradaData = ''
        baterpontoData.intervalSaidaData = ''
        baterpontoData.checkInHorario = formatDateTimeToBrazilTimeZone(new Date())
        baterpontoData.checkOutHorario = ''
        baterpontoData.intervalEntradaHorario = ''
        baterpontoData.intervalSaidaHorario = ''

        const newBaterPonto = baterpontoRepository.create(baterpontoData);
        await baterpontoRepository.save(newBaterPonto);
        return newBaterPonto;
    }
}
export default CheckInPontoService
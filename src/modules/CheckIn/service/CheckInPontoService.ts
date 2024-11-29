import {formatDateToPTBR, formatDateTimeToBrazilTimeZone} from '../../User/validator/baterPontoValidator';
import baterponto from '../entity/baterponto';
import AppDataSource from "../../../db/data-source";

class CheckInPontoService {
    async createCheckIn(baterpontoData: baterponto, id: string): Promise<baterponto> {
        const baterpontoRepository = AppDataSource.getRepository(baterponto);

        baterpontoData.userId = id
        baterpontoData.checkInData = formatDateToPTBR(new Date());
        baterpontoData.checkOutData = ''
        baterpontoData.intervalEntradaData = '1'
        baterpontoData.intervalSaidaData = '1'
        baterpontoData.checkInHorario = formatDateTimeToBrazilTimeZone(new Date())
        baterpontoData.checkOutHorario = '1'
        baterpontoData.intervalEntradaHorario = '1'
        baterpontoData.intervalSaidaHorario = '1'

        const newBaterPonto = baterpontoRepository.create(baterpontoData);
        await baterpontoRepository.save(newBaterPonto);
        return newBaterPonto;
    }
}
export default CheckInPontoService
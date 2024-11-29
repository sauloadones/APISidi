import {formatDateToPTBR, formatDateTimeToBrazilTimeZone} from '../../User/validator/baterPontoValidator';
import baterponto from '../entity/baterponto';
import AppDataSource from "../../../db/data-source";

class CheckInPontoService {
    async createCheckIn(baterpontoData: Partial<baterponto>): Promise<baterponto> {
        const baterpontoRepository = AppDataSource.getRepository(baterponto);

        baterpontoData.checkInData = formatDateToPTBR(new Date());
        baterpontoData.checkOutData = formatDateTimeToBrazilTimeZone(new Date())
        baterpontoData.intervalEntradaData = ''
        baterpontoData.intervalSaidaData = ''
        baterpontoData.checkInHorario = ''
        baterpontoData.checkOutHorario = ''
        baterpontoData.intervalEntradaHorario = ''
        baterpontoData.intervalSaidaHorario = ''

        const newBaterPonto = baterpontoRepository.create(baterpontoData);
        await baterpontoRepository.save(newBaterPonto);
        return newBaterPonto;
    }
}
export default CheckInPontoService
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../../db/data-source"));
const baterponto_1 = __importDefault(require("../entity/baterponto"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const baterPontoValidator_1 = require("../../User/validator/baterPontoValidator");
class intervalInicioService {
    updateIntervalStart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const baterpontoRepository = data_source_1.default.getRepository(baterponto_1.default);
            const baterPonto = yield baterpontoRepository.findOne({ where: { id } });
            if (!baterPonto) {
                throw new AppError_1.default('CheckIn not found', 404);
            }
            baterPonto.intervalEntradaData = (0, baterPontoValidator_1.formatDateToPTBR)(new Date());
            baterPonto.intervalEntradaHorario = (0, baterPontoValidator_1.formatDateTimeToBrazilTimeZone)(new Date());
            yield baterpontoRepository.save(baterPonto);
            return baterPonto;
        });
    }
}
exports.default = intervalInicioService;

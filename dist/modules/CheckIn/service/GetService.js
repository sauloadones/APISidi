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
class getCheckInById {
    getCheckInByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const baterpontoRepository = data_source_1.default.getRepository(baterponto_1.default);
            const checkIns = yield baterpontoRepository.find({ where: { userId: userId } });
            console.log(userId);
            console.log(checkIns);
            if (!checkIns.length) {
                throw new AppError_1.default('Check-ins not found', 404);
            }
            return checkIns;
        });
    }
}
exports.default = getCheckInById;

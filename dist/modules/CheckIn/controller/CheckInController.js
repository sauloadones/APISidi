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
const CheckInPontoService_1 = __importDefault(require("../service/CheckInPontoService"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const CheckOutPontoService_1 = __importDefault(require("../service/CheckOutPontoService"));
const IntervalStartService_1 = __importDefault(require("../service/IntervalStartService"));
const IntervalEndService_1 = __importDefault(require("../service/IntervalEndService"));
const GetService_1 = __importDefault(require("../service/GetService"));
class CheckInController {
    constructor() {
        this.createCheckIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.params;
                console.log(userId);
                const checkIn = yield this.checkInPontoService.createCheckIn(req.body, userId);
                res.status(201).json(checkIn);
            }
            catch (error) {
                if (error instanceof AppError_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unexpected error occurred' });
                }
            }
        });
        this.updateCheckOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedCheckOut = yield this.checkOutService.updateCheckOut(Number(id));
                res.status(200).json(updatedCheckOut);
            }
            catch (error) {
                if (error instanceof AppError_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unexpected error occurred' });
                }
            }
        });
        this.updateIntervalEntrada = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedIntervalEntrada = yield this.IntervalInicioService.updateIntervalStart(Number(id));
                res.status(200).json(updatedIntervalEntrada);
            }
            catch (error) {
                if (error instanceof AppError_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unexpected error occurred' });
                }
            }
        });
        this.updateIntervalFinal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedSaidaService = yield this.IntervalFinalService.updateIntervalEnd(Number(id));
                res.status(200).json(updatedSaidaService);
            }
            catch (error) {
                if (error instanceof AppError_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unexpected error occurred' });
                }
            }
        });
        this.getCheckInByUserId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: userId } = req.params;
                const checkIns = yield this.getCheckInById.getCheckInByUserId(userId);
                res.status(200).json(checkIns);
            }
            catch (error) {
                if (error instanceof AppError_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unexpected error occured' });
                }
            }
        });
        this.checkInPontoService = new CheckInPontoService_1.default();
        this.checkOutService = new CheckOutPontoService_1.default();
        this.IntervalInicioService = new IntervalStartService_1.default();
        this.IntervalFinalService = new IntervalEndService_1.default();
        this.getCheckInById = new GetService_1.default();
    }
}
exports.default = CheckInController;

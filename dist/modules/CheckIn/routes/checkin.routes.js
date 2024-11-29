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
const express_1 = require("express");
const CheckInController_1 = __importDefault(require("../controller/CheckInController"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const checkInController = new CheckInController_1.default();
const checkInRoutes = (0, express_1.Router)();
checkInRoutes.post('/checkin/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkInController.createCheckIn(req, res);
    }
    catch (error) {
        throw new AppError_1.default(`${error}`, 500);
    }
}));
checkInRoutes.patch('/checkout/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkInController.updateCheckOut(req, res);
    }
    catch (error) {
        throw new AppError_1.default(`${error}`, 500);
    }
}));
checkInRoutes.patch('/is/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkInController.updateIntervalEntrada(req, res);
    }
    catch (error) {
        throw new AppError_1.default(`${error}`, 500);
    }
}));
checkInRoutes.patch('/ie/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkInController.updateIntervalFinal(req, res);
    }
    catch (error) {
        throw new AppError_1.default(`${error}`, 500);
    }
}));
checkInRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkInController.getCheckInByUserId(req, res);
    }
    catch (error) {
        throw new AppError_1.default(`${error}`, 500);
    }
}));
exports.default = checkInRoutes;

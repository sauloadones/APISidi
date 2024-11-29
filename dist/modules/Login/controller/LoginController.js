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
const LoginUserValidator_1 = __importDefault(require("../../User/validator/LoginUserValidator"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
class LoginController {
    constructor(loginService) {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = LoginUserValidator_1.default.validate(req.body);
                if (error) {
                    throw new AppError_1.default(`${error.message}`, 400);
                }
                const loginResult = yield this.loginService.login(req.body);
                res.status(200).json(loginResult);
            }
            catch (error) {
                if (error instanceof AppError_1.default) {
                    console.error('Known Error:', error.message);
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    console.error('Unexpected Error:', error);
                    res.status(500).json({ message: 'An unexpected error occurred' });
                }
            }
        });
        this.loginService = loginService;
    }
}
exports.default = LoginController;

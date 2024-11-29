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
const Entities_1 = __importDefault(require("../../User/entity/Entities"));
const data_source_1 = __importDefault(require("../../../db/data-source"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const auth_1 = __importDefault(require("../../../config/auth"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginService {
    constructor() {
        this.login = (loginData) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(Entities_1.default);
            const { email, password } = loginData;
            if (!email) {
                throw new AppError_1.default("Email is required", 409);
            }
            const existingUser = yield userRepository.findOne({ where: { email } });
            if (!existingUser) {
                throw new AppError_1.default("Should be a valid a valid email", 409);
            }
            const isPasswordValid = yield (0, bcrypt_1.compare)(password, existingUser.password);
            if (isPasswordValid == false) {
                throw new AppError_1.default('Email or password not found', 409);
            }
            const token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.email }, auth_1.default.jwt.secret, { expiresIn: auth_1.default.jwt.expiresIn });
            return { token, username: existingUser.name, id: existingUser.id };
        });
    }
}
exports.default = LoginService;

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
const Entities_1 = __importDefault(require("../entity/Entities"));
const data_source_1 = __importDefault(require("../../../db/data-source"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const PasswordEncryption_1 = require("../encryptPassword/PasswordEncryption");
class CreateUserService {
    constructor() {
        this.createUser = (userData) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(Entities_1.default);
            const { email, name, password, comfirmPassword } = userData;
            console.log(password);
            console.log(comfirmPassword);
            const hashed = yield (0, PasswordEncryption_1.encrypt)(password);
            const newUser = new Entities_1.default();
            newUser.email = email;
            newUser.name = name;
            newUser.password = hashed;
            const existingUser = yield userRepository.findOne({
                where: { email: email }
            });
            if (existingUser) {
                throw new AppError_1.default('Esse email ja existe', 409);
            }
            yield userRepository.save(newUser);
            return newUser;
        });
    }
}
exports.default = CreateUserService;

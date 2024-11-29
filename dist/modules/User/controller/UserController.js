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
exports.UserController = void 0;
const data_source_1 = __importDefault(require("../../../db/data-source"));
const Entities_1 = __importDefault(require("../entity/Entities"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const CreateUserValidator_1 = __importDefault(require("../validator/CreateUserValidator"));
class UserController {
    constructor(createUserService, showUserService) {
        this.createUserService = createUserService;
        this.showUserService = showUserService;
        this.userRepository = data_source_1.default.getRepository(Entities_1.default);
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = CreateUserValidator_1.default.validate(req.body);
                if (error) {
                    throw new AppError_1.default(error.message, 400);
                }
                const newUser = yield this.createUserService.createUser(req.body);
                return res.status(201).json(newUser);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error creating user:', error.message, error.stack);
                    return res.status(409).json({ message: error.message });
                }
                else {
                    console.error('Unexpected error:', error);
                    return res.status(500).json({ message: error });
                }
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id.trim();
                const user = yield this.showUserService.findUserNameById(id);
                return res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error creating user:', error.message, error.stack);
                    return res.status(409).json({ message: error.message });
                }
                else {
                    console.error('Unexpected error:', error);
                    return res.status(500).json({ message: error });
                }
            }
        });
    }
}
exports.UserController = UserController;

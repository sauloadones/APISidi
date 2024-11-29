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
const Entities_1 = __importDefault(require("../entity/Entities"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const auth_1 = __importDefault(require("../../../config/auth"));
const PasswordEncryption_1 = require("../encryptPassword/PasswordEncryption");
class PasswordController {
    constructor() {
        this.requestPasswordReset = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const userRepository = data_source_1.default.getRepository(Entities_1.default);
            const user = yield userRepository.findOne({ where: { email } });
            if (!user) {
                throw new AppError_1.default('User not found', 404);
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, auth_1.default.jwt.secret, { expiresIn: '1h' });
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset',
                text: `You requested a password reset. Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
            };
            yield transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Password reset email sent' });
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token, newPassword } = req.body;
            try {
                const decoded = jsonwebtoken_1.default.verify(token, auth_1.default.jwt.secret);
                const userRepository = data_source_1.default.getRepository(Entities_1.default);
                const user = yield userRepository.findOne({ where: { id: decoded.userId } });
                if (!user) {
                    throw new AppError_1.default('User not found', 404);
                }
                user.password = yield (0, PasswordEncryption_1.encrypt)(newPassword);
                yield userRepository.save(user);
                return res.status(200).json({ message: 'Password reset successful' });
            }
            catch (error) {
                throw new AppError_1.default(`Invalid or expired token ${error} `, 400);
            }
        });
    }
}
exports.default = PasswordController;

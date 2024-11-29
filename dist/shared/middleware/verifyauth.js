"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth_1 = __importDefault(require("../../config/auth"));
const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    console.log('Authorization Header:', authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new AppError_1.default('JWT token is missing or malformed', 401));
    }
    const token = authorization.split(' ')[1];
    console.log('Extracted Token:', token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.default.jwt.secret);
        console.log('Decoded Token:', decoded);
        req.user = {
            email: decoded.email,
        };
        return next();
    }
    catch (err) {
        console.error('Token Verification Error:', err);
        return next(new AppError_1.default('Invalid JWT token', 401));
    }
};
exports.authMiddleware = authMiddleware;

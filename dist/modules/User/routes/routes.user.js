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
const UserController_1 = require("../controller/UserController");
const services_1 = __importDefault(require("../services")); // Ensure this import path is correct
const verifyauth_1 = require("../../../shared/middleware/verifyauth");
const userRoutes = (0, express_1.Router)();
const userController = new UserController_1.UserController(new services_1.default.CreateUserService(), new services_1.default.ShowUserService());
userRoutes.post('/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.create(req, res);
    }
    catch (error) {
        next(error);
    }
}));
userRoutes.get('/getById', verifyauth_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.getById(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = userRoutes;

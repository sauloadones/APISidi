"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = __importDefault(require("../controller/LoginController"));
const LoginService_1 = __importDefault(require("../service/LoginService"));
const loginRoutes = (0, express_1.Router)();
const loginController = new LoginController_1.default(new LoginService_1.default());
loginRoutes.post('/', loginController.login);
exports.default = loginRoutes;

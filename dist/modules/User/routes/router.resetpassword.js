"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PasswordController_1 = __importDefault(require("../controller/PasswordController"));
const passwordController = new PasswordController_1.default();
const passwordRoutes = (0, express_1.Router)();
passwordRoutes.post('/request-reset', passwordController.requestPasswordReset.bind);
passwordRoutes.post('/reset-password', passwordController.resetPassword.bind);
exports.default = passwordRoutes;

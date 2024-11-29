"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_user_1 = __importDefault(require("../../modules/User/routes/routes.user"));
const routes_login_1 = __importDefault(require("../../modules/Login/routes/routes.login"));
const checkin_routes_1 = __importDefault(require("../../modules/CheckIn/routes/checkin.routes"));
const router_resetpassword_1 = __importDefault(require("../../modules/User/routes/router.resetpassword"));
const verifyauth_1 = require("../middleware/verifyauth");
const routes = (0, express_1.Router)();
routes.use('/login', routes_login_1.default);
routes.use('/user', routes_user_1.default);
routes.use('/bp', verifyauth_1.authMiddleware, checkin_routes_1.default);
routes.use('/reset', verifyauth_1.authMiddleware, router_resetpassword_1.default);
exports.default = routes;

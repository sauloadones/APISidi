"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createLoginValidator = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .messages({
        'string.email': 'Please enter a valid email address'
    }),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});
exports.default = createLoginValidator;

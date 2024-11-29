"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createUserValidator = joi_1.default.object({
    name: joi_1.default.string()
        .uppercase()
        .required()
        .messages({
        'any.required': 'Name is required'
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.email': 'Please enter a valid email address'
    }),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
        'string.pattern.base': 'Password must be between 3 and 30 characters'
    }),
    confirmPassword: joi_1.default.string()
        .valid(joi_1.default.ref('password'))
        .required()
        .messages({
        'any.only': 'Passwords do not match'
    })
}).with('password', 'confirmPassword');
exports.default = createUserValidator;

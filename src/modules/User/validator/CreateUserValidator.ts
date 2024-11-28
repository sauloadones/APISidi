import Joi from 'joi';

const createUserValidator = Joi.object({
    name: Joi.string()
        .uppercase()
        .required()
        .messages({
            'any.required': 'Name is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please enter a valid email address'
        }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match'
        })
}).with('password', 'confirmPassword');

export default createUserValidator;


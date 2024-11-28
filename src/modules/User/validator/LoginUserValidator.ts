import Joi from "joi";

const createLoginValidator =  Joi.object({
    email: Joi.string()
        .email()
        .messages({
            'string.email': 'Please enter a valid email address'

        }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
   
        
}) 

export default createLoginValidator
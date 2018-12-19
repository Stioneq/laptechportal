const Joi = require('joi');

module.exports = {
    body: Joi.object().keys({
        username: Joi.string().min(3).max(12).required(),
        password: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        firstname: Joi.string().min(5).required(),
        lastname: Joi.string().min(5).required()
    })
};

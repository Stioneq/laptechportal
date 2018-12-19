const Joi = require('joi');


module.exports = {
    newComment: {
        body: Joi.object().keys({
            text: Joi.string().required()
        }).options({
            stripUnknown: true
        })
    },
    editComment: {
        body: Joi.object().keys({
            text: Joi.string().required()
        }).options({
            stripUnknown: true
        })
    }
};

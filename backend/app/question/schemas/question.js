const Joi = require('joi');


const tagValidator = Joi.object().keys({
    title: Joi.string().required(),
    background: Joi.string().required(),
    color: Joi.string().required()
});

module.exports = {
    newQuestion: {
        body: Joi.object().keys({
            title: Joi.string().min(5).required(),
            question: Joi.string().min(5).required(),
            answer: Joi.string().min(5).required(),
            tags: Joi.array().items(tagValidator).required()
        }).options({
            stripUnknown: true
        })
    },
    editQuestion: {
        body: Joi.object().keys({
            title: Joi.string().min(5).required(),
            question: Joi.string().min(5).required(),
            answer: Joi.string().min(5).required(),
            tags: Joi.array().items(tagValidator).required()
        }).options({
            stripUnknown: true
        })
    },
    rateQuestion: {
        query: {
            rating: Joi.number().min(0).max(5).required()
        }
    }
};

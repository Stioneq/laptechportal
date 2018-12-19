const Events = require('../constants');
const {
    QuestionModel
} = require('../../models');

module.exports = {
    event: Events.RATING_CHANGED,
    handler: async (ratingResult) => {
        return QuestionModel.updateQuestionRating(ratingResult.id, ratingResult.rating);
    }
};

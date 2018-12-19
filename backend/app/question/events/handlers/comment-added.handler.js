const Events = require('../constants');
const {
    QuestionModel
} = require('../../models');
module.exports = {
    event: Events.COMMENT_ADDED,
    handler: async (questionId) => {
        return QuestionModel.addCommentsCount(questionId, 1);
    }
};

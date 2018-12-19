const Events = require('../constants');
const {
    QuestionModel
} = require('../../models');
module.exports = {
    event: Events.COMMENT_REMOVED,
    handler: async (questionId) => {
        return QuestionModel.addCommentsCount(questionId, -1);
    }
};

const Events = require('../constants');
const _ = require('lodash');
const {
    CommentModel,
    QuestionModel
} = require('../../models');
module.exports = {
    event: Events.MODULE_LOADED,
    handler: async () => {
        const [ids, comments] = await Promise.all([QuestionModel.findDistinctIds(), CommentModel.countCommentsGroupedByQuestionId()]);
        const commentsGroupedByQuestionIds = _.mapValues(_.keyBy(comments, '_id'), 'comments');
        QuestionModel.batchUpdateComments(_.map(ids, (obj) => ({
            id: obj._id,
            comments: commentsGroupedByQuestionIds[obj._id] || 0
        })));
    }
};

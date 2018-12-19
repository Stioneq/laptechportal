const {
    CommentModel
} = require('../models');
const {
    Events,
    eventBus
} = require('../events');
const logger = require('../../logging/winston');

/**
 * Gets comments by question id
 * @param {string} questionId
 */
async function getComments(questionId) {
    const comments = await CommentModel.findAllByQuestionId(questionId);
    return {
        comments
    };
}

/**
 * Adds comment with given questionId
 * @param {Object} comment comment object
 */
async function addComment(comment) {
    logger.info(`${comment.author} add comment with msg ${comment.text}`);
    const result = await CommentModel.insertOne(comment);
    eventBus.emit(Events.COMMENT_ADDED, result.questionId);
    return result;
}

/**
 * Deletes comment by commentId
 * @param {string} questionId string representation of the questionId
 * @param {string} commentId string representation of the commentId
 */
async function deleteComment(questionId, commentId) {
    logger.info(`Delete comment with id ${commentId}`);
    const result = CommentModel.deleteOne(commentId);
    eventBus.emit(Events.COMMENT_REMOVED, questionId);
    return result;
}

/**
 * Updates comment
 * @param {Object} comment comment object
 */
async function updateComment(comment) {
    logger.info(`${comment.author} update comment with id ${comment.id}`);
    const result = await CommentModel.updateOne(comment);
    return result;
}


module.exports = {
    getComments,
    addComment,
    deleteComment,
    updateComment
};

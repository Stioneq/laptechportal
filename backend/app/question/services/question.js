const {
    QuestionModel,
    RatingModel
} = require('../models');

const logger = require('../../logging/winston');
const {
    Events,
    eventBus
} = require('../events');
/**
 *
 * @param {{questions: any}} username
 */
async function getQuestionPreviews(username) {
    logger.info(`Fetch all questions previews for ${username}`);

    const questionPreviews = await QuestionModel.findQuestionPreviews(username);

    return {
        questions: questionPreviews
    };
}

/**
 * Returns question content
 * @param {string} username
 * @param {string} qid
 */
async function getQuestionById(username, qid) {
    logger.info(`Fetch question=${qid} details for ${username}`);
    const question = await QuestionModel.findOne(qid);
    question.id = question._id;
    const userRating = await RatingModel.findByUserIdAndQuestionId(username, qid);
    delete question._id;
    question.userRating = userRating && userRating.rating || 0;
    return question;
}

/**
 * Rates question for user with id=userId for question=questionId with rating
 * @param {string} userId
 * @param {string} questionId
 * @param {number} rating
 */
async function rateQuestion(userId, questionId, rating) {
    logger.info(`${userId} rates question=${questionId} with ${rating}`);
    const questionRating = await RatingModel.updateRate({
        questionId,
        userId,
        rating
    });
    const result = {
        id: questionId,
        rating: questionRating.rating
    };
    eventBus.emit(Events.RATING_CHANGED, result);
    return result;
}

/**
 * Inserts one question in the db
 * @param {Object} question object
 */
async function addQuestion(question) {
    logger.info(`${question.author} add question with title ${question.title}`);
    question.rating = 0;
    const result = await QuestionModel.insertOne(question);
    return result;
}

/**
 * Inserts one question in the db
 * @param {Object} question object
 */
async function updateQuestion(question) {
    logger.info(`${question.author} update question with id ${question.id}`);
    question._id = question.id;
    delete question.id;
    const result = await QuestionModel.updateOne(question);
    return result;
}

/**
 * Deletes question by id
 * @param {string} questionId string representation of the question id
 */
async function deleteQuestion(questionId) {
    logger.info(`delete question with id=${questionId}`);
    const result = await QuestionModel.deleteOne(questionId);
    return result;
}

module.exports = {
    getQuestionPreviews,
    getQuestionById,
    rateQuestion,
    addQuestion,
    deleteQuestion,
    updateQuestion
};

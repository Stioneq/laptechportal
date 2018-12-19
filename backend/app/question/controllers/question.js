const {
    QuestionService
} = require('../services');
const logger = require('../../logging/winston');

exports.getQuestionPreviews = async (req, res) => {
    const response = await QuestionService.getQuestionPreviews(req.username);
    res.json(response);
};

exports.getQuestion = async (req, res) => {
    const response = await QuestionService
        .getQuestionById(req.username, req.params.questionId);
    res.json(response);
};

exports.deleteQuestion = async (req, res) => {
    try {
        await QuestionService
            .deleteQuestion(req.params.questionId);
        res.status(200).json({
            status: 'Deleted'
        });
    } catch (err) {
        logger.error(err);
        res.status(500).json({
            status: 'Internal server exception',
            error: err
        });
    }
};

exports.updateQuestion = async (req, res) => {
    const question = req.body;
    try {
        if (req.params.questionId !== question.id) {
            throw Error('Incorrect questionId');
        }
        await QuestionService.updateQuestion(question);
        res.status(200).json({
            status: 'Updated'
        });
    } catch (err) {
        logger.error(err);
        res.status(500).json({
            status: 'Internal server exception',
            error: err
        });
    }
};

exports.addQuestion = async (req, res) => {
    const question = req.body;
    question.author = req.username;
    try {
        await QuestionService.addQuestion(question);
        res.status(201).json({
            status: 'Created'
        });
    } catch (err) {
        logger.error(err);
        res.status(500).json({
            status: 'Internal server exception',
            error: err
        });
    }
};

exports.rateQuestion = async (req, res) => {
    const response = await QuestionService.rateQuestion(req.username,
        req.params.questionId, +req.query.rating);
    return res.json(response);
};

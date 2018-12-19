const {
    CommentService
} = require('../services');
const logger = require('../../logging/winston');

exports.getComments = async (req, res) => {
    const response = await CommentService
        .getComments(req.params.questionId);
    res.json(response);
};

exports.addComment = async (req, res) => {
    const comment = req.body;
    comment.author = req.username;
    comment.questionId = req.params.questionId;
    try {
        const response = await CommentService.addComment(comment);
        res.status(201).json(response);
    } catch (err) {
        logger.error(err);
        res.status(500).json({
            status: 'Internal server exception',
            error: err
        });
    }
};
exports.deleteComment = async (req, res) => {
    try {
        await CommentService
            .deleteComment(req.params.questionId, req.params.commentId);
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

exports.updateComment = async (req, res) => {
    const comment = req.body;
    comment.author = req.username;
    comment.questionId = req.params.questionId;
    comment.id = req.params.commentId;
    try {
        const result = await CommentService.updateComment(comment);
        res.status(200).json(result);
    } catch (err) {
        logger.error(err);
        res.status(500).json({
            status: 'Internal server exception',
            error: err
        });
    }
};

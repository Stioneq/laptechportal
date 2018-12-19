const {
    CommentController
} = require('../controllers');
const passport = require('passport');
const validateIt = require('../../../utils/middleware/validate-it');
const {
    CommentSchema
} = require('../schemas');
module.exports = (router) => {
    return router
        .get('/:questionId/comments',
            passport.authenticate(['jwt', 'anonymous'], {
                session: false
            }), CommentController.getComments)
        .put('/:questionId/comments',
            [passport.authenticate(['jwt'], {
                session: false
            }), validateIt(CommentSchema.newComment)], CommentController.addComment)
        .delete('/:questionId/comments/:commentId',
            passport.authenticate(['jwt'], {
                session: false
            }), CommentController.deleteComment)
        .put('/:questionId/comments/:commentId',
            [passport.authenticate(['jwt'], {
                session: false
            }), validateIt(CommentSchema.editComment)], CommentController.updateComment);
};

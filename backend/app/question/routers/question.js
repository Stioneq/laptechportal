const {
    QuestionController
} = require('../controllers');
const passport = require('passport');
const validateIt = require('../../../utils/middleware/validate-it');
const {
    QuestionSchema
} = require('../schemas');
module.exports = (router) => {
    return router.post('/', passport.authenticate(['jwt', 'anonymous'], {
        session: false
    }), QuestionController.getQuestionPreviews)
        .put('/', [passport.authenticate(['jwt'], {
            session: false
        }), validateIt(QuestionSchema.newQuestion)], QuestionController.addQuestion)
        .get('/:questionId', passport.authenticate(['jwt', 'anonymous'], {
            session: false
        }), QuestionController.getQuestion)
        .put('/:questionId', [passport.authenticate(['jwt', 'anonymous'], {
            session: false
        }), validateIt(QuestionSchema.editQuestion)], QuestionController.updateQuestion)
        .delete('/:questionId', passport.authenticate(['jwt'], {
            session: false
        }), QuestionController.deleteQuestion)
        .post('/:questionId/rate', [passport.authenticate(['jwt'], {
            session: false
        }), validateIt(QuestionSchema.rateQuestion)], QuestionController.rateQuestion);
};

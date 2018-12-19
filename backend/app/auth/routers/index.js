const {
    Router
} = require('express');
const {
    authController
} = require('../controllers');
const validateIt = require('../../../utils/middleware/validate-it');
const router = Router();
const passport = require('passport');
router.use(passport.initialize());
router
    .post('/login', authController.login)
    .post('/register', validateIt(require('../schemas/user')), authController.register);

module.exports = router;

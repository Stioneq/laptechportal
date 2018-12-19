const {
    Router
} = require('express');
const userController = require('../controllers');
const passport = require('passport');
const router = Router();

router.get('/', passport.authenticate('jwt', {
    session: false
}), userController.get);

module.exports = router;

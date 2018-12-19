const {
    Router
} = require('express');
const {
    imagesController
} = require('../controllers');
const passport = require('passport');
const router = Router();

router.get('/images/:filename?', imagesController.getImage);
router.post('/images/upload/usericon', passport.authenticate('jwt', {
    session: false
}), imagesController.uploadUserIcon);

module.exports = router;
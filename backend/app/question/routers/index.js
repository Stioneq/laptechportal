const express = require('express');

const router = express.Router();
const config = require('@laptechportal/config');

router.use(
    require('../../../utils/middleware/jwt-value-retriever')(config.app.auth.jwt.secret, 'username')
);
require('./question')(router);
require('./comment')(router);

module.exports = router;

const express = require('express');
const TagController = require('../controllers');
const router = express.Router();

router
    .get('/', TagController.searchTags);

module.exports = router;

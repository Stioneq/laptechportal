const ratingChangedHandler = require('./rating-changed.handler');
const commentAddedHandler = require('./comment-added.handler');
const commentRemovedHandler = require('./comment-removed.handler');
const moduleLoadedHandler = require('./module-loaded.handler');
module.exports = [
    ratingChangedHandler,
    commentAddedHandler,
    commentRemovedHandler,
    moduleLoadedHandler
];

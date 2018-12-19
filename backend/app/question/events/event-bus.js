const {
    EventEmitter
} = require('events');

const logger = require('../../logging/winston');
const handlers = require('./handlers');

/**
 * Event bus that works within questions module
 */
class EventBus extends EventEmitter {
    constructor() {
        super();
        logger.info(`Start registration of eventbus' handlers`);
        handlers.forEach((handler) => {
            logger.info(`Register handler for ${handler.event}`);
            this.on(handler.event, handler.handler);
        });
    }
};

module.exports = new EventBus();

const router = require('./routers');
const {
    eventBus,
    Events
} = require('./events');

(function onModuleStart() {
    eventBus.emit(Events.MODULE_LOADED);
})();

module.exports = {
    router
};

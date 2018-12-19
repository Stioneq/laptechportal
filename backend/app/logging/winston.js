const winston = require('winston');
const moment = require('moment');
const {
    createLogger,
    format
} = winston;
const {
    combine,
    colorize,
    align,
    printf
} = format;
const myConsoleFormat = printf(function(info) {
    return `${moment().format('YYYY-MM-DD HH:mm:ss')} ${info.level}: ${info.message} `;
});
const logger = createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'combined.log'
        })

    ]
});
logger.add(new winston.transports.Console({
    format: combine(myConsoleFormat,
        colorize({
            all: true
        }), align())
}));

module.exports = logger;

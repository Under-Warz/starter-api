const winston = require('winston');
const path = require('path');
const fs = require('fs');

winston.emitErrs = true;

const logDirectory = path.join(__dirname, '..', '..', 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: path.join(logDirectory, 'error.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;

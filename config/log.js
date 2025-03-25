const winston = require("winston");

let {json, combine, timestamp} = winston.format

const logger = winston.createLogger({
    level: "info",
    format: combine(
        timestamp(), json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logger.log"}),
    ]
});

module.exports = logger

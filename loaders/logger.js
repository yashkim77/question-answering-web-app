require('express-async-errors');
const winston = require('winston');
const path = require('path');

console.log(path.dirname(__dirname));
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => `{"time":"${info.timestamp}","level":"${info.level}","message":"${info.message}","stack":${JSON.stringify(info.stack)}}`)
    ),
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.timestamp()
        )
      }),
      new winston.transports.File({ filename: path.dirname(__dirname)+'/logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: path.dirname(__dirname)+'/logs/info.log', level: 'info' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: path.dirname(__dirname)+'/logs/uncaughtException.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: path.dirname(__dirname)+'/logs/uncaughtRejection.log' })
    ],
    exitOnError: false
});

module.exports = logger;
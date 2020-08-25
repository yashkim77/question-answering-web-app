require('express-async-errors');
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp()
        )
      }),
      new winston.transports.File({ 
        filename: path.dirname(__dirname)+'/logs/error.log', 
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.align(),
          winston.format.printf(info => `{"time":"${info.timestamp}","level":"${info.level}","message":"${info.message}","stack":${JSON.stringify(info.stack)}}`)
      )}),
      new winston.transports.File({ 
        filename: path.dirname(__dirname)+'/logs/warning.log', 
        level: 'warning',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.align(),
          winston.format.printf(info => `{"time":"${info.timestamp}","level":"${info.level}","message":"${info.message}}`)
      )})
    ],
    exceptionHandlers: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.prettyPrint(),
          winston.format.timestamp()
        )
      }),
        new winston.transports.File({ 
          filename: path.dirname(__dirname)+'/logs/uncaughtException.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `{"time":"${info.timestamp}","level":"${info.level}","message":"${info.message}","stack":${JSON.stringify(info.stack)}}`)
        )})
    ],
    rejectionHandlers: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.prettyPrint(),
          winston.format.timestamp()
        )
      }),
        new winston.transports.File({ 
          filename: path.dirname(__dirname)+'/logs/uncaughtRejection.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `{"time":"${info.timestamp}","level":"${info.level}","message":"${info.message}","stack":${JSON.stringify(info.stack)}}`)
        )})
    ],
    exitOnError: false
});

module.exports = logger;
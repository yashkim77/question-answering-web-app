const winston = require('winston');
const logger = require('../loaders/logger');

module.exports = function(err, req, res, next) {
    //log the exception
    logger.error(err.message,err);
    res.status(500).send('Error Occured');
}
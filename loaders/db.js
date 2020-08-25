const mongoose = require('mongoose')
const config  = require('../config/dbConfig.json')
const chalk = require('chalk');
const logger = require('./logger');
const url = `mongodb://${config['dbHostname']}:${config['dbPort']}/${config['dbName']}`;
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

mongoose.connect(url, { 
    auth:{
    authdb: "admin",
    user:config['dbUserName'],
    password:config['dbPassword']
    },
    authSource:"admin",
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// When successfully connected
mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + url);
});
  
// If the connection throws an error
mongoose.connection.on('error',function (err) {
    logger.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
  
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
});
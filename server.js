'use strict';
const express = require('express');
const path = require('path');
const logger = require('./loaders/logger');
const app = express();

require('./loaders/logger');
require('./loaders/routes')(app);
require('./loaders/db');
require('./loaders/prod')(app);

app.use(express.static(__dirname + '/static'));

//server port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;
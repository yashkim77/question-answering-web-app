const express = require('express');
const bodyParser = require('body-parser');
const error = require('../middleware/error');
const home = require('../routes/home');
const generateAnswers = require('../routes/generateAnswers');
const saveContextQuestionsAnswers = require('../routes/questionAnswerPair');

module.exports = function(app) {
    //Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); 

    //routes
    app.use('/',home);
    app.use('/answers',generateAnswers);
    app.use('/saveContextQuestionsAnswers',saveContextQuestionsAnswers);

    //Error handler middleware
    app.use(error);
}
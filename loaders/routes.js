const express = require('express');
const bodyParser = require('body-parser');
const error = require('../middleware/error');
const home = require('../routes/home');
const answers = require('../routes/answers');
const saveContextQuestionsAnswers = require('../routes/questionAnswerPair');

module.exports = function(app) {
    //Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); 

    //routes
    app.use('/',home);
    app.use('/answers',answers);
    app.use('/saveContextQuestionsAnswers',saveContextQuestionsAnswers);

    //Error handler middleware
    app.use(error);
}
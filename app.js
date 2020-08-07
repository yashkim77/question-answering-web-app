'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { initModel, QAClient } = require('question-answering');
const cors = require('cors');
const app = express();


//Middleware
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});
app.use(express.static(__dirname + '/static'));

async function answerQuestion(question,passage) {
    
    const model = await initModel({ name: "distilbert-base-uncased-distilled-squad" });
    const qaClient = await QAClient.fromOptions({ model });
    const answer = await qaClient.predict(question, passage);
    return answer;

}

app.get('/',async (req,res) => {
    res.sendFile(path.join(__dirname+'/views'+'/questionAnswer.html'));
    //__dirname : It will resolve to your project folder.
});

app.post('/getAnswer',async (req,res) => {
    
    console.log(req.body);
    const passage = req.body.passage;
    let questions = req.body.questions;
    console.log(passage);
    console.log(questions);
    let answers = [];
    for (const question of questions) {
        let answer = await answerQuestion(question,passage);
        answers.push(answer);
    };
    res.send(answers);
});

app.post('/saveQuestionAnswer',(req,res) => {
    console.log(req.body);
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
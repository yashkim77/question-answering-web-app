const config = require('../config/index.json');
const express = require('express');
const { initModel, QAClient } = require('question-answering');

const router = express.Router();

async function searchAnswers(question,passage) {

    const model = await initModel({ name: config["modelName"]});
    const qaClient = await QAClient.fromOptions({ model });
    const answer = await qaClient.predict(question, passage);
    return answer;
}

router.post('/',async (req,res,next) => {
    
    const passage = req.body.passage;
    let questions = req.body.questions;
    let answers = [];
    for (const question of questions) {
        let answer = await searchAnswers(question,passage);
        answers.push(answer['text']);
    }
    res.send(answers);   
});

module.exports = router;
const config = require('../config.json');
const express = require('express');
const { initModel, QAClient } = require('question-answering');

const router = express.Router();
const RuntimeType = {
    Remote : "remote",
    SavedModel : "saved_model",
    TFJS : "tfjs"
};

async function answerQuestion(question,passage) {

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
        let answer = await answerQuestion(question,passage);
        answers.push(answer['text']);
    };
    res.send(answers);
});

module.exports = router;
const config = require('../config/index.json');
const express = require('express');
const extractAnswers = require('../services/extractAnswers');

const router = express.Router();

function validate(passage,questions) {
    if (passage === "" || questions.length == 0 || passage.length < 50 || questions[0].length == 0 ) {
        return true;
    }
    return false;
} 

router.post('/',async (req,res,next) => {
    const passage = req.body.passage;
    let questions = req.body.questions;
    let answers = [];
    let flag=1;
    if (validate(passage,questions)) {
        res.status(404).send({"error": "Please fill the required fields" });
        return;
    }
    for (const question of questions) {
        let answer = await extractAnswers(question,passage);
        answers.push(answer['text']);
    }
    res.send(answers);   
});

module.exports = router;
const config = require('../config/index.json');
const express = require('express');
const extractAnswers = require('../services/extractAnswers');

const router = express.Router();

router.post('/',async (req,res,next) => {
    const passage = req.body.passage;
    let questions = req.body.questions;
    let answers = [];
    let flag=1;
    if (passage === "" || questions.length == 0) {
        res.send({"error": "Please fill the required fields" });
        return;
    }
    for (const question of questions) {
        let answer = await extractAnswers(question,passage);
        answers.push(answer['text']);
    }
    res.send(answers);   
});

module.exports = router;
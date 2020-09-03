const UserContextQuestionAnswer =  require('../services/contextQuestionAnswers')
const express = require('express');
router = express.Router();

function validate(passage,questions) {
    if (passage === "" || questions.length == 0 || questions[0].length == 0 || passage.length < 50) {
        return true;
    }
    return false;
}
router.post('/',async (req,res,next) => {
    const passage = req.body.passage;
    let questions = req.body.questions;
    let answers = req.body.answers;
    if (validate(passage,questions)) {
        res.status(404).send({"error": "Required field are empty" });
        return;
    }
    if (questions.length == 1) {
        if (answers.length == 2) {
            answers = answers[0]
        }
    }
    const result = await UserContextQuestionAnswer.create(passage,questions,answers);
    res.status(201).send({"message":"Success"});
});

module.exports = router;

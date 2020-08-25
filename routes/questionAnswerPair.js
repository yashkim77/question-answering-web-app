const UserContextQuestionAnswer =  require('../services/contextQuestionAnswers')
const express = require('express');
router = express.Router();

router.post('/',async (req,res,next) => {
    const passage = req.body.passage;
    let questions = req.body.questions;
    let answers = req.body.answers;
    if (passage === "" || questions.length == 0) {
        res.send({"error": "Required are empty" });
        return;
    }
    if (questions.length == 1) {
        if (answers.length == 2) {
            answers = answers[0]
        }
    }
    const result = await UserContextQuestionAnswer.create(passage,questions,answers);
    res.status(200).send({"message":"Success"});
});

module.exports = router;

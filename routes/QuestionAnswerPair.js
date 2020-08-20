const ContextQuestionAnswer =  require('../models/questionAnswerData');
const express = require('express');
router = express.Router();

async function createContextQuestionAnswer(passage,question,answer) {
    const contextQuestion = new ContextQuestionAnswer({
        context : passage,
        questions: question,
        answers: answer
    });
    const result = await contextQuestion.save();
    return "success";
}

router.post('/',async (req,res,next) => {
    try {
        const passage = req.body.passage;
        let question = req.body.questions;
        let answer = req.body.answers;
        const result = await createContextQuestionAnswer(passage,question,answer);
        res.send("Success");
    }
    catch (ex) {
        res.status.send(error=err);
    }
});

module.exports = router;

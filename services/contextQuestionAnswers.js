const ContextQuestionAnswer =  require('../models/contextQuestionAnswer');

class UserContextQuestionAnswer {

    static async create(passage,question,answer) {
        const contextQuestion = new ContextQuestionAnswer({
            context : passage,
            questions: question,
            answers: answer
        });
        const result = await contextQuestion.save();
        return "success";
    }
}

module.exports = UserContextQuestionAnswer;

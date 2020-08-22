const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contextQuestionAnswer = new Schema({
    context: {
        type: String,
        required: true,
        minlength:25,
    },
    questions: {
        type:[String],
        required: true
    },
    answers: {
        type:[String],
    }

});

module.exports = mongoose.model('contextQuestionAnswer', contextQuestionAnswer);
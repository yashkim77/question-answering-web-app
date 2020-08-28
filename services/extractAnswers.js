const config = require('../config/index.json');
const { initModel, QAClient } = require('question-answering');

module.exports = async function searchAnswers(question,passage) {

    const model = await initModel({ name: config["modelName"]});
    const qaClient = await QAClient.fromOptions({ model });
    const answer = await qaClient.predict(question, passage);
    return answer;
}
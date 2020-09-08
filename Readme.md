# Question Answering Web App
Question Answering Web App is a web application used to answer question-based on a given context or passage.

I am using Hugging Face pretrained DistilBERT model trained on SQuAD. DistilBERT is a small, fast, cheap and light Transformer model trained by distilling Bert base. It has 40% less parameters than bert-base-uncased, runs 60% faster while preserving over 95% of Bert’s performances as measured on the GLUE language understanding benchmark.

App Link - https://question-answering-web-app.herokuapp.com/

![title](/static/images/question-answering-demo.png)

Running locally:
* Install node and npm(https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Clone the repository 
* Navigate to inside the project folder on terminal, where I would hopefully see a package.json file.
* Do an **npm install** for installing all the project dependencies.
* Do an **npm install -g nodemon** for installing all the project dependencies.
* Then **npm start OR node server.js OR nodemon server.js** to get the app running on local host at port 4000.

### Credits
Got the pretrained model from Hugging Face(https://huggingface.co/).
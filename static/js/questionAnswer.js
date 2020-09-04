'use strict';

//Method to save the context and question pair in database
function saveContextQuestionAnswers(answers) {
    let contextQuestionAnswer = {};
    let passage =  $('#passage').val();
    let questions = [];
    $(".questions").each(function() {
        let question = $(this).val();
        questions.push(question);                
    });
    contextQuestionAnswer['passage'] = passage;
    contextQuestionAnswer['questions'] = questions;
    if (questions.length == 1) {
        if (answers.length == 2) {
            answers = answers[0]
        }
    }
    contextQuestionAnswer['answers'] =  answers;
    $.post('saveContextQuestionsAnswers',contextQuestionAnswer,function(response) {
        if(response.hasOwnProperty('error')) {
            //alert(response.error);
        } else {
        }
    },'json').done(function() {
        console.log('done');  
    }).fail(function (xhr, status, error) {
       console.log('fail');
    });
}

//Method to validate input from user.Context and question 
function inputValidation() {
    
    let contextQuestions = {};
    contextQuestions['passage'] = $('#passage').val();
    if (contextQuestions['passage'] === "") {
        $(".warningMessage").html('Please fill out the passage field');
        $(".warningPopUp").show().delay(4000).fadeOut();
        return false;
    }
    if (contextQuestions['passage'].length < 50) {
        $(".warningMessage").html('Please fill out the passage field in atleast 50 characters');
        $(".warningPopUp").show().delay(4000).fadeOut();
        return false;
    }
    let questions = [];
    let count = 1;
    let flag = 0;
    $(".questions").each(function() {
        let value = $(this).val();
        if(value === "" && count == 1) {
            $(".warningMessage").html('Please fill out the first question field');
            $(".warningPopUp").show().delay(4000).fadeOut();
            flag=1;
            return;
                
        }
        let question = $(this).val();
        if (question !== "") {
            questions.push(question);
        }
        count++;                    
    });
    if (flag == 1) {
        return false;
    }
    contextQuestions['questions'] = questions;
    return contextQuestions;
}

function putAnswers(answers) {
    for (let index=0;index < answers.length;index++) {
        $('.answers').eq(index).val(answers[index]);
    }
}

//Method to display answer to the user//alert(response.error);
$(document).ready(function () {  
    //Method on search button   
    $("#search").on("click", function() {
        let contextQuestions = inputValidation();
        if (contextQuestions == false) {
            return;
        }
        $(".loading").show();
        $.post('answers',contextQuestions,function(response){
            if(response.hasOwnProperty('error')) {
                $(".loading").hide();
                $(".warningMessage").html(response['error']);
                $(".warningPopUp").show().delay(4000).fadeOut();

            } else {
                $(".loading").hide();
                let answers = response;
                putAnswers(answers);
                saveContextQuestionAnswers(answers);
            }
        },'json').done(function() {
            $(".loading").hide();   
        }).fail(function (xhr, status, error) {
            $(".loading").hide();
            let response;
            if (xhr['responseJSON']['error']) {
                response = xhr['responseJSON']['error'];
            }
            else {
                response = "Please try after sometime."
            }
            $(".errorMessage").html(response);
            $(".errorPopUp").show().delay(4000).fadeOut();
        });
        
    });

    //Method on reset button
    $("#reset").on("click", function() {
        $('#passage').val('');
        $(".questions").each(function() {
            $(this).val('');                    
        });
        $(".answers").each(function() {
            $(this).val('');                    
        });

    });
});
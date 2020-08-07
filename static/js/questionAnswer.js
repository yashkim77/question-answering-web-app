'use strict';
$(document).ready(function () {       
    $("#search").on("click", function() {
        console.log("hello");
        let searchAnswer = {};
        searchAnswer['passage'] = $('#passage').val();
        let questions = [];
        let count = 1;
        $(".questions").each(function() {
            let value = $(this).val();
            console.log("insert");
            if(value === "" && count == 1) {
                $(".message").html('Please fill out the field.');
                $(".warningPopUp").show().delay(3000).fadeOut();
                console.log("after");
            }
            let question = $(this).val();
            questions.push(question);
            count++;                    
        });
        searchAnswer['questions'] = questions;
        $.post('getAnswer',searchAnswer,function(response){
            if(response.hasOwnProperty('error')) {
                //alert(response.error);
            } else {
                //alert(response);
            }
        },'json').done(function() {
            console.log("done");    
        });
        
    });
   
});
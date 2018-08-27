const bodyParser = require("body-parser");
const fs = require('fs');
const watson = require('watson-developer-cloud');

//Initialize Watson Assistant
var assistant = new watson.AssistantV1({
    username: 'ca418883-0886-4f85-b330-b4471a0b0a6f',
    password: 'REi2LXfAMjQp',
    version: '2018-07-10'
  });

exports.watsonAssistant = (req, res, next) => {

    //Parse user input
    var user_input = req.body.answer;
    var conversation_context = req.body.context;

    var params = {}

    var params_without_context = {
      workspace_id: '71cfe434-03be-4edb-bd5c-96fd45762b93',
      input: {'text': user_input},
    }

    var params_with_context = {
      workspace_id: '71cfe434-03be-4edb-bd5c-96fd45762b93',
      input: {'text': user_input},
      context: req.body.context
    }

    if(conversation_context == '') {
      params = params_without_context
    } else {
      params = params_with_context
    }

    //Call Watson Assistant
    assistant.message(params,  function(err, response) {
        if (err)
          console.log('error:', err);
        else
        watson_assistant_response = response;
        watson_assistant_text_response = watson_assistant_response.output.text[0];
        
        //Process the Watson Assistant input
         var watson_assistant_response_end_result = {
            sender: 'Watson Assistant',
            message: watson_assistant_text_response,
            context: watson_assistant_response.context
        };

        //Return the Watson Assistant output
        res.json(watson_assistant_response_end_result);
        });    
};

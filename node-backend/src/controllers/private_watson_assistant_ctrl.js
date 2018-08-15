const bodyParser = require("body-parser");
const fs = require('fs');
const watson = require('watson-developer-cloud');

//Initialize Watson Assistant
var assistant = new watson.AssistantV1({
    username: 'ca418883-0886-4f85-b330-b4471a0b0a6f',
    password: 'REi2LXfAMjQp',
    version: '2018-07-10'
  });

exports.check = (req, res, next) => {
    res.status(201).json({
        user: req.token.email
    });
};

exports.watsonAssistant = (req, res, next) => {

    //Parse user input
    var user_input = req.body.answer;

    //Call Watson Assistant
    assistant.message({
        workspace_id: '927342bb-6845-410d-9af0-9d358da445c7',
        input: {'text': user_input}
      },  function(err, response) {
        if (err)
          console.log('error:', err);
        else
        watson_assistant_response = response;
        console.log(watson_assistant_response);
        watson_assistant_text_response = watson_assistant_response.output.text[0];
        
        //Process the Watson Assistant input
         var watson_assistant_response_end_result = {
            sender: 'Watson Assistant',
            message: watson_assistant_text_response
        };

        //Return the Watson Assistant output
        res.json(watson_assistant_response_end_result);
        });    
};

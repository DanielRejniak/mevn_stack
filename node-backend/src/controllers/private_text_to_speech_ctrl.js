const bodyParser = require("body-parser");
const fs = require('fs');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

var textToSpeech = new TextToSpeechV1({
    username: '945e343e-39da-442d-b9ad-29fb9201d1a7',
    password: 'DOPf8jSihL5t',
    url: 'https://stream.watsonplatform.net/text-to-speech/api'
  });

exports.check = (req, res, next) => {
    res.status(201).json({
        user: req.token.email
    });
};

exports.watsonTextToSpeech = (req, res, next) => {

  console.log("Calling Text to Speech API")

  // textToSpeech.listVoices(null, function(error, voices) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(JSON.stringify(voices, null, 2));
  //   }
  // });

  var synthesizeParams = {
    text: 'Hi Daniel',
    accept: 'audio/wav',
    voice: 'en-US_LisaVoice'
  };

  // Pipe the synthesized text to a file.
  textToSpeech.synthesize(synthesizeParams).on('error', function(error) {
    console.log(error);
  }).pipe(fs.createWriteStream('text_to_speech_test.wav'));

}

const bodyParser = require("body-parser");
const fs = require('fs');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'L8jziipoK4OVcJvMAlf2DZbMDiTSW3kJYl0M91VnPAd7'
});

exports.check = (req, res, next) => {
    res.status(201).json({
        user: req.token.email
    });
};

exports.watsonImageRecognition = (req, res, next) => {

    // image = req.body.image;

    // console.log('firebaseToken = ' + req.body.firebaseToken)
    // console.log('message = ' + req.body.message)
    // console.log('image = ' + req.body.imageBody)
    // console.log('threshold = ' + req.body.threshold)

    var test_file = fs.createReadStream('/Users/danielrejniak/Desktop/crowd.jpg');

    var user_set_treashhold = req.body.treshhold / 100;

    var images_file=test_file;
    var classifier_ids = [" DefaultCustomModel_648716771"];
    var threshold = 0.6;

    var params = {
      images_file: images_file,
      classifier_ids: classifier_ids,
      threshold: threshold
    };

    visualRecognition.classify(params, function(err, response) {
      if (err)
        console.log(err);
      else
        res.status(201).json(response);
    });
};

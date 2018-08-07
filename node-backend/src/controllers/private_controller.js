const bodyParser = require("body-parser");
const fs = require('fs');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'QtO_Sscty7KuQ7ObjnqlSYsU0-2hvFf0Ybvm43hWoCA1'
});

exports.check = (req, res, next) => {
    res.status(201).json({
        user: req.token.email
    });
};

exports.watsonImageRecognition = (req, res, next) => {

    image = req.body.imageUrl;

    var test_file = fs.createReadStream('/Users/danielrejniak/Desktop/crowd.jpg');

    var images_file=test_file;
    var classifier_ids = ["default"];
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
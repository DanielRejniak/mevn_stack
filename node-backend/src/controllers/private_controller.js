const bodyParser = require("body-parser");
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

    image = req.body.imageUrl
    console.log("I recieved : " + image[0]);

    var images_file= image[0];
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
        //res.status(400).json({"message":"Error"});
      else
        //console.log(JSON.stringify(response, null, 2))
        res.status(201).json({"test" : 10});
    });

    
};
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

    res.status(201).json({
        "images" : [ {
          "classifiers" : [ {
            "classifier_id" : "default",
            "name" : "default",
            "classes" : [ {
              "class" : "fruit",
              "score" : 0.788
            }, {
              "class" : "olive color",
              "score" : 0.973
            }, {
              "class" : "lemon yellow color",
              "score" : 0.789
            } ]
          } ],
          "image" : "fruitbowl.jpg"
        } ],
        "images_processed" : 1,
        "custom_classes" : 2
      });
};
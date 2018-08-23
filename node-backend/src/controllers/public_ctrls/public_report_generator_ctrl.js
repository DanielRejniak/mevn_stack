const bodyParser = require("body-parser");
const fs = require('fs');
var mongoose = require('mongoose');

/* Location prvided are temporary, usaly a GPS coordinate would come from a mobile 
device or a drone. In our case we need to provide a list of GPS cordinates for
the application to choose from. */

var locations = [
    { position: { lat: 34.305975, lng: -118.397002 },label: { text: '1238'}},
    { position: { lat: 34.238820, lng: -118.211824 },label: { text: '4564'}},
    { position: { lat: 34.159945, lng: -117.900542 },label: { text: '2532'}},
    { position: { lat: 34.009049, lng: -118.804173 },label: { text: '7975'}},
    { position: { lat: 33.727757, lng: -118.347863 },label: { text: '4444'}},
    { position: { lat: 33.559480, lng: -117.808348 },label: { text: '4545'}}
];

var location_names = [
    'LA 3200 Canyon Dr',
    'LA Tujunga',
    'LA Crescenta Highlands',
    'LA Victory Park',
    'LA El Monte',
    'LA Cypress'
];

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/aweda-db';

// Connect to mongodb
mongoose.connect(dbHost, function(err) {
    if(err) {
      console.log('Database Not Connected!');
    } else {
      console.log('Database Connected');
    }
  });

// Create Mongoose Report Schema
const reportSchema = new mongoose.Schema({
    watson_assistant_chat_log: Array,
    image_id: String,
    image_gps_location: Object,
    location_name: String,
    people_found: String,
    image_provided: String
  });
  
  // Create Mongoose Model
  const Report = mongoose.model('Report', reportSchema);

exports.generateJSONReport = (req, res) => {

    //Generate random location index
    var random_location_index = Math.floor((Math.random() * 5) + 0);

    console.log("Conversation : " + req.body.watson_assistant_conversation_log);
    console.log("People Found : " + req.body.people_found);
    console.log("Image Passed : " + req.body.image_provided);

    let report = new Report({
        watson_assistant_chat_log: req.body.watson_assistant_conversation_log,
        image_id: req.body.image_id,
        image_gps_location: locations[random_location_index],
        location_name: location_names[random_location_index],
        people_found: req.body.people_found,
        image_provided: req.body.image_provided
    });

    report.save(error => {
        if (error) {
            console.log(error);
        } else {
            res.status(201).json({
                message: 'Report created Successfully'
            });
        }
        
    });
};

exports.retrieveReports = (req,res) => {
        Report.find({}, (err, reports) => {
            if (err) res.status(500).send(error)
            res.status(200).json(reports);
        });
};

exports.clearReports = (req,res) => {
    console.log("Clearing Reports");
    Report.remove({}, function(err) {
        if(err) {
            res.status(500).send(error)
        } else {
            res.status(201).json({
                message: 'Report cleared Successfully'
            });
        }
    });
};
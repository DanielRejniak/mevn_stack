const bodyParser = require("body-parser");

exports.check = (req, res, next) => {
    res.status(201).json({
        user: req.token.email
    });
};

exports.events = (req, res, next) => {
    events = {
        name: "Test Event",
        location_county: "Dublin",
        location_town: "Malahide"
    };
    res.status(201).json({
        user: events
    });
};
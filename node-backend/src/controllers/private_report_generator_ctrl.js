const bodyParser = require("body-parser");
const fs = require('fs');
var mongoose = require('mongoose');

exports.generateJSONReport = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        user: req.token.email
    });
};

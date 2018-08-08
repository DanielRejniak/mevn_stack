const bodyParser = require("body-parser");
const fs = require('fs');

exports.check = (req, res, next) => {
    res.status(201).json({
        user: req.token.email
    });
};

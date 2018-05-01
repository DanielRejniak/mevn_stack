const bodyParser = require("body-parser");

exports.check = (req, res, next) => {
    res.status(201).json({
        message: "Hello From Public Route"
    });
};
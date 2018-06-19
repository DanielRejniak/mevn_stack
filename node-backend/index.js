const express = require('express')
const app = express()
const morgan = require('morgan');
const bodyParser = require("body-parser");
var admin = require('firebase-admin');
const mongoose = require('mongoose');
const use_database = false;

//Configurations
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var serviceAccount = require('./src/firebase-service-file.json');

//Initialize Firebase Service Account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-project-e0286.firebaseio.com"
});

//Setup Cross Origin Access Control
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

//Setup Database URL
const dbHost = 'mongodb://database/mevn-app';

// Connect to mongodb
if(use_database) {
    mongoose.connect(dbHost, function(err) {
        if(err) {
            console.log('Database Not Connected!');
        } else {
            console.log('Database Connected');
        }
    });
}


const privateRoutes = require('./src/routes/private');
const publicRoutes = require('./src/routes/public');

// Routes which should handle requests
app.use("/private", privateRoutes);
app.use("/public", publicRoutes);

// Handle Route Not Found
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
 
// Handle Server Error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Set The Server Port
app.listen(3000, () => console.log('Example app listening on port http://localhost:3000'))
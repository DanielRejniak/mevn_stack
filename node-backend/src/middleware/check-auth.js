var admin = require('firebase-admin');

//Middleware Auth Check
module.exports =  (req,res,next) => {
    idToken = req.body.firebaseToken
    admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
        var uid = decodedToken.uid;
        req.uid = uid;
        next()
    }).catch(function(error) {
        res.status(403).json({
            message: 'Forbiden'
        });
    });
}
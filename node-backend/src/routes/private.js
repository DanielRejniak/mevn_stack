const express = require("express");
const router = express.Router();

const private_image_recognition_ctrl = require('../controllers/private_image_recognition_ctrl');
const private_speach_to_text_ctrl = require('../controllers/private_speach_to_text_ctrl');
const private_text_to_speach_ctrl = require('../controllers/private_text_to_speach_ctrl');
const private_watson_assistant_ctrl = require('../controllers/private_watson_assistant_ctrl');

const checkAuth = require('../middleware/check-auth');

router.post("/watsonImageRecognition", checkAuth, private_image_recognition_ctrl.watsonImageRecognition);
router.post("/watsonAssistant", checkAuth, private_watson_assistant_ctrl.watsonAssistant);
router.post("/watsonTextToSpeach", checkAuth, private_text_to_speach_ctrl.check);
router.post("/watsonSpeachToText", checkAuth, private_speach_to_text_ctrl.check);

module.exports = router;
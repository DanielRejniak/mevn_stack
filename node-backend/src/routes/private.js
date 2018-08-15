const express = require("express");
const router = express.Router();

const private_image_recognition_ctrl = require('../controllers/private_image_recognition_ctrl');
const private_speech_to_text_ctrl = require('../controllers/private_speech_to_text_ctrl');
const private_text_to_speech_ctrl = require('../controllers/private_text_to_speech_ctrl');
const private_watson_assistant_ctrl = require('../controllers/private_watson_assistant_ctrl');

const checkAuth = require('../middleware/check-auth');

router.post("/watsonImageRecognition", checkAuth, private_image_recognition_ctrl.watsonImageRecognition);
router.post("/watsonAssistant", checkAuth, private_watson_assistant_ctrl.check);
router.post("/watsonTextToSpeech", checkAuth, private_text_to_speech_ctrl.watsonTextToSpeech);
router.post("/watsonSpeechToText", checkAuth, private_speech_to_text_ctrl.check);

module.exports = router;

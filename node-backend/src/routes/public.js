const express = require("express");
const router = express.Router();

const public_image_recognition_ctrl = require('../controllers/public_ctrls/public_image_recognition_ctrl');
const public_speach_to_text_ctrl = require('../controllers/public_ctrls/public_speach_to_text_ctrl');
const public_text_to_speach_ctrl = require('../controllers/public_ctrls/public_text_to_speach_ctrl');
const public_watson_assistant_ctrl = require('../controllers/public_ctrls/public_watson_assistant_ctrl');
const public_report_generator_ctrl = require('../controllers/public_ctrls/public_report_generator_ctrl');

router.post("/watsonImageRecognition", public_image_recognition_ctrl.watsonImageRecognition);
router.post("/watsonAssistant", public_watson_assistant_ctrl.watsonAssistant);
router.post("/watsonTextToSpeach", public_text_to_speach_ctrl.check);
router.post("/watsonSpeachToText", public_speach_to_text_ctrl.check);
router.post("/generateJSONReport", public_report_generator_ctrl.generateJSONReport);
router.get("/retrieveReports", public_report_generator_ctrl.retrieveReports);
router.get("/clearReports", public_report_generator_ctrl.clearReports);

module.exports = router;
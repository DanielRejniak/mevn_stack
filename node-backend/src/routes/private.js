const express = require("express");
const router = express.Router();

const PrivateController = require('../controllers/private_controller');
const checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, PrivateController.check);
router.post("/watsonImageRecognition", checkAuth, PrivateController.watsonImageRecognition);

module.exports = router;
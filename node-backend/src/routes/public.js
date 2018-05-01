const express = require("express");
const router = express.Router();

const PublicController = require('../controllers/public_controller');

router.post("/", PublicController.check);

module.exports = router;
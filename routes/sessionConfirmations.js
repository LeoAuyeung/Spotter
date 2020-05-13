var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const sessionConfirmationsController = require("../controllers/sessionConfirmations");

router.route("/").get(sessionConfirmationsController.getAllSessionConfirmations);

module.exports = router;

var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const daysController = require("../controllers/days");

router.route("/").get(daysController.getAllDays);

module.exports = router;

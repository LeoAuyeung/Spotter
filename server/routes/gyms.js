var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const gymsController = require("../controllers/gyms");

router.route("/").get(gymsController.getAllGyms);

module.exports = router;

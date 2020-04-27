var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const userGymsController = require("../controllers/userGyms");

router.route("/").get(userGymsController.getAllUserGyms);

module.exports = router;

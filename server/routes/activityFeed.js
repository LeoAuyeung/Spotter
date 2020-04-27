var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const activityFeedController = require("../controllers/activityFeed");

router.route("/").get(activityFeedController.getAllActivityFeed);

module.exports = router;

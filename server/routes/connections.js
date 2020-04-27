var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const connectionsController = require("../controllers/connections");

router.route("/").get(connectionsController.getAllConnections);

module.exports = router;

var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const volumesController = require("../controllers/volumes");

router.route("/").get(volumesController.getAllVolumes);

module.exports = router;

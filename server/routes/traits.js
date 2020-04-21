var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const traitsController = require("../controllers/traits");

router.route("/").get(traitsController.getAllTraits);

module.exports = router;

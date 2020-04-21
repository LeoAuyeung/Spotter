var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const workoutsController = require("../controllers/workouts");

router.route("/").get(workoutsController.getAllWorkouts);

module.exports = router;

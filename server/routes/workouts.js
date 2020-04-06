var express = require('express');
var router = express.Router();
const workoutController = require("../controllers/workouts");

router.route("/").get(workoutController.getAllWorkouts);

module.exports = router;

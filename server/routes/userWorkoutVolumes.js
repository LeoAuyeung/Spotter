var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const userWorkoutVolumesController = require("../controllers/userWorkoutVolumes");

router.route("/").get(userWorkoutVolumesController.getAllUserWorkoutVolumes);
router.route("/").post(auth, userWorkoutVolumesController.createUserWorkoutVolume);
router.route("/:id").put(auth, userWorkoutVolumesController.editUserWorkoutVolume);
router.route("/:id").delete(auth, userWorkoutVolumesController.deleteUserWorkoutVolume);

module.exports = router;

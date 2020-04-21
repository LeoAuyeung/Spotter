var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const schedulesController = require("../controllers/schedules");

router.route("/").get(schedulesController.getAllSchedules);
router.route("/").post(auth, schedulesController.createSchedule);
router.route("/:id").put(auth, schedulesController.editSchedule);
router.route("/:id").delete(auth, schedulesController.deleteSchedule);

module.exports = router;

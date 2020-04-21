const express = require("express");
const router = express.Router();

// Subrouters;
const usersRouter = require("./users");
const userWorkoutVolumesRouter = require("./userWorkoutVolumes");
const sessionsRouter = require("./sessions");
const schedulesRouter = require("./schedules");
const traitsRouter = require("./traits");
const volumesRouter = require("./volumes");
const workoutsRouter = require("./workouts");

router.use("/users", usersRouter);
router.use("/userWorkoutVolumes", userWorkoutVolumesRouter);
router.use("/sessions", sessionsRouter);
router.use("/schedules", schedulesRouter);
router.use("/traits", traitsRouter);
router.use("/volumes", volumesRouter);
router.use("/workouts", workoutsRouter);

module.exports = router;
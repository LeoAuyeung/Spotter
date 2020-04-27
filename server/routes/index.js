const express = require("express");
const router = express.Router();

// Subrouters;
const sessionsRouter = require("./sessions");
const schedulesRouter = require("./schedules");
const traitsRouter = require("./traits");
const usersRouter = require("./users");
const userTraitsRouter = require("./userTraits");
const userWorkoutVolumesRouter = require("./userWorkoutVolumes");
const volumesRouter = require("./volumes");
const workoutsRouter = require("./workouts");

router.use("/sessions", sessionsRouter);
router.use("/schedules", schedulesRouter);
router.use("/traits", traitsRouter);
router.use("/users", usersRouter);
router.use("/userTraits", userTraitsRouter);
router.use("/userWorkoutVolumes", userWorkoutVolumesRouter);
router.use("/volumes", volumesRouter);
router.use("/workouts", workoutsRouter);

module.exports = router;
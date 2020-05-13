const express = require("express");
const router = express.Router();

// Subrouters;
const activityFeedRouter = require("./activityFeed");
const connectionsRouter = require("./connections");
const daysRouter = require("./days");
const gymsRouter = require("./gyms");
const schedulesRouter = require("./schedules");
const sessionConfirmationsRouter = require("./sessionConfirmations");
const sessionsRouter = require("./sessions");
const traitsRouter = require("./traits");
const userGymsRouter = require("./userGyms");
const usersRouter = require("./users");
const userTraitsRouter = require("./userTraits");
const userWorkoutVolumesRouter = require("./userWorkoutVolumes");
const volumesRouter = require("./volumes");
const workoutsRouter = require("./workouts");

router.use("/activityFeed", activityFeedRouter);
router.use("/connections", connectionsRouter);
router.use("/days", daysRouter);
router.use("/gyms", gymsRouter);
router.use("/schedules", schedulesRouter);
router.use("/sessionConfirmations", sessionConfirmationsRouter);
router.use("/sessions", sessionsRouter);
router.use("/traits", traitsRouter);
router.use("/userGyms", userGymsRouter);
router.use("/users", usersRouter);
router.use("/userTraits", userTraitsRouter);
router.use("/userWorkoutVolumes", userWorkoutVolumesRouter);
router.use("/volumes", volumesRouter);
router.use("/workouts", workoutsRouter);

module.exports = router;
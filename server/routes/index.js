const express = require("express");
const router = express.Router();

// Subrouters;
const userRouter = require("./users");
const workoutRouter = require("./workouts");

router.use("/users", userRouter);
router.use("/workouts", workoutRouter);

module.exports = router;
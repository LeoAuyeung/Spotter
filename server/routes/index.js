const express = require("express");
const router = express.Router();

// Subrouters;
const usersRouter = require("./users");
const sessionsRouter = require("./sessions");
const schedulesRouter = require("./schedules");

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/schedules", schedulesRouter);

module.exports = router;
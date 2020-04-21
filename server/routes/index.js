const express = require("express");
const router = express.Router();

// Subrouters;
const usersRouter = require("./users");
const sessionsRouter = require("./sessions");

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);

module.exports = router;
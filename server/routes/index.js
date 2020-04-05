const express = require("express");
const router = express.Router();

// Subrouters;
const userRouter = require("./users");

router.use("/users", userRouter);

module.exports = router;
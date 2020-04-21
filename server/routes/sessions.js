var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const sessionsController = require("../controllers/sessions");

router.route("/").get(sessionsController.getAllSessions);
router.route("/").post(auth, sessionsController.createSession);
router.route("/:id").put(auth, sessionsController.editSession);
router.route("/:id").delete(auth, sessionsController.deleteSession);

module.exports = router;

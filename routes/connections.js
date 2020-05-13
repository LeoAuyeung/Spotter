var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const connectionsController = require("../controllers/connections");

router.route("/").get(connectionsController.getAllConnections);
router.route("/:userId").get(connectionsController.getUserConnections);
router.route("/:userId").post(connectionsController.createConnection);
router.route("/:id").delete(connectionsController.deleteConnection);

module.exports = router;

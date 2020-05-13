var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const connectionsController = require("../controllers/connections");

router.route("/").get(connectionsController.getAllConnections);
router.route("/myConnections").get(auth, connectionsController.getMyConnections);
router.route("/:userId").get(auth, connectionsController.getUserConnections);
router.route("/:userId").post(auth, connectionsController.createConnection);
router.route("/:id").delete(auth, connectionsController.deleteConnection);

module.exports = router;

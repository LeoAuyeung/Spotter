var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const userGymsController = require("../controllers/userGyms");

router.route("/").get(userGymsController.getAllUserGyms);
router.route("/:userId").get(userGymsController.getAllUserGyms);
router.route("/:gymId").post(userGymsController.createUserGym);
router.route("/:id").delete(userGymsController.deleteUserGym);

module.exports = router;

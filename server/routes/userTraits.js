var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const userTraitsController = require("../controllers/userTraits");

router.route("/").get(userTraitsController.getAllUserTraits);
router.route("/:userId").post(auth, userTraitsController.createUserTrait);
router.route("/:id").put(auth, userTraitsController.editUserTrait);
router.route("/:id").delete(auth, userTraitsController.deleteUserTrait);

module.exports = router;

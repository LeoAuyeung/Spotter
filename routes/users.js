var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");

const userController = require("../controllers/users");

router.route("/").get(auth, userController.getAllUsers);
router.route("/filter").get(userController.getFilteredUsers);
router.route("/auth/decodeJwt").get(userController.decodeJwtToken);
router.route("/auth/login").post(userController.loginUser);
router.route("/auth/register").post(userController.registerUser);
router.route("/me").get(userController.me);
router.route("/profile").get(userController.profile);
router.route("/profile/:id").get(userController.otherProfile);

module.exports = router;

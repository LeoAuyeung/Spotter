var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const userController = require("../controllers/users");

router.route("/").get(auth, userController.getAllUsers);
router.route("/auth/login").post(userController.loginUser);

module.exports = router;

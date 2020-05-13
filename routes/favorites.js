var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const favoritesController = require("../controllers/favorites");

router.route("/").get(favoritesController.getAllFavorites);
router.route("/:userId").get(auth, favoritesController.getUserFavorites);
router.route("/:userId").post(auth, favoritesController.createFavorite);
router.route("/:id").delete(auth, favoritesController.deleteFavorite);

module.exports = router;
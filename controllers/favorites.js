var database = require("../models");
var decodeJwt = require("../middleware/decodeJwt");
const { Op } = require("sequelize");

const favoritesController = {
	getAllFavorites: getAllFavorites,
	getUserFavorites: getUserFavorites,
	createFavorite: createFavorite,
	deleteFavorite: deleteFavorite,
};

async function getAllFavorites(req, res, next) {
	try {
		console.log("-------------------------------------")
		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		let allFavorites = await database.favorites.findAll({
			raw: true,
			where: { userId_1: currentUser.id },
		});

		var userFavorites = await Promise.all(
			allFavorites.map(async (favoriteEle) => {
				var tempUser = await database.users.findOne({
					raw: true,
					where: { id: favoriteEle.userId_2 },
				});
				return tempUser;
			})
		).then((completed) => {
			return completed;
		});
		res.status(200).json(userFavorites);
	} catch (err) {
		console.log(err);
	}
}

async function getUserFavorites(req, res, next) {
	try {
		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});

		// Get all favorites of current user
		const userFavorites = await database.favorites.findAll({
			raw: true,
			where: {
				[Op.or]: [{ userId_1: currentUser.id }, { userId_2: currentUser.id }],
			},
		});

		res.status(200).json(userFavorites);
	} catch (err) {
		console.log(err);
	}
}

async function createFavorite(req, res, next) {
	try {
		const { userId } = req.params; // Id of user2, user that you are connecting to

		const allFavorites = await database.favorites.findAll();
		let latestFavorite;
		if (allFavorites.length > 0) {
			latestFavorite = allFavorites[allFavorites.length - 1];
		} else {
			latestFavorite = { id: -1 };
		}
		const latestInt = parseInt(latestFavorite.id);
		let newFavorite = { id: String(latestInt + 2) };

		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		newFavorite.userId_1 = currentUser.id;
		newFavorite.userId_2 = userId;

		await database.favorites.create(newFavorite);
		res.status(201).json(newFavorite);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({
				code: "error",
				message: "Error with creating Session. Please retry.",
			});
	}
}

async function deleteFavorite(req, res, next) {
	try {
		// Using Favorite unique id to check whether it exists and is available to delete
		const { id } = req.params; // Favorite unique id
		const currentFavorite = await database.favorites.findOne({
			raw: true,
			where: { id: id },
		});
		if (currentFavorite == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Favorite does not exist." });
		}

		// Delete the Favorite
		const deleted = await database.favorites.destroy({ where: { id: id } });
		if (deleted) {
			return res
				.status(201)
				.json({ code: "success", message: "Favorite successfully deleted." });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({
				code: "error",
				message: "Error with deleting Favorite. Please retry.",
			});
	}
}

module.exports = favoritesController;

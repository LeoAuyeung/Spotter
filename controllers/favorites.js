var database = require("../models");
var decodeJwt = require("../middleware/decodeJwt");
const { Op } = require("sequelize");

const favoritesController = {
	getAllFavorites: getAllFavorites,
	getUserFavorites: getUserFavorites,
	getMyFavorites: getMyFavorites,
	createFavorite: createFavorite,
	deleteFavorite: deleteFavorite,
};

async function getAllFavorites(req, res, next) {
	try {
		const allFavorites = await database.favorites.findAll();
		res.status(200).json(allFavorites);
	} catch (err) {
		console.log(err);
	}
}

async function getMyFavorites(req, res, next) {
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
		let favoritesList = [];
		for (let i = 0; i < userFavorites.length; i++) {
			if (userFavorites[i].userId_1 == currentUser.id) {
				// return second user
				const user = await database.users.findAll({ raw: true, where: { id: userFavorites[i].userId_2 }});
				favoritesList.push(user);
			}
			else {
				// return first user
				const user = await database.users.findAll({ raw: true, where: { id: userFavorites[i].userId_1 }});
				favoritesList.push(user);
			}
		}

		res.status(200).json(favoritesList);
	} catch (err) {
		console.log(err);
	}
}

async function getUserFavorites(req, res, next) {
	try {
		const { userId } = req.params;

		// Get all favorites of current user
		const userFavorites = await database.favorites.findAll({
			raw: true,
			where: {
				[Op.or]: [{ userId_1: userId }, { userId_2: userId }],
			},
		});
		console.log(userFavorites);
		let favoritesList = [];
		for (let i = 0; i < userFavorites.length; i++) {
			if (userFavorites[i].userId_1 == userId) {
				// return second user
				const user = await database.users.findAll({ raw: true, where: { id: userFavorites[i].userId_2 }});
				favoritesList.push(user);
			}
			else {
				// return first user
				const user = await database.users.findAll({ raw: true, where: { id: userFavorites[i].userId_1 }});
				favoritesList.push(user);
			}
		}

		res.status(200).json(favoritesList);
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

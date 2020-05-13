var database = require("../models");
var decodeJwt = require("../middleware/decodeJwt");
const { Op } = require("sequelize");

const connectionsController = {
	getAllConnections: getAllConnections,
	getUserConnections: getUserConnections,
	createConnection: createConnection,
	deleteConnection: deleteConnection,
};

async function getAllConnections(req, res, next) {
	try {
		const allConnections = await database.connections.findAll();
		res.status(200).json(allConnections);
	} catch (err) {
		console.log(err);
	}
}

async function getUserConnections(req, res, next) {
	try {
		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});

		// Get all connections of current user
		const userConnections = await database.connections.findAll({
			raw: true,
			where: {
				[Op.or]: [{ userId_1: currentUser.id }, { userId_2: currentUser.id }],
			},
		});

		res.status(200).json(userConnections);
	} catch (err) {
		console.log(err);
	}
}

async function createConnection(req, res, next) {
	try {
		const { userId } = req.params; // Id of user2, user that you are connecting to

		const allConnections = await database.connections.findAll();
		let latestConnection;
		if (allConnections.length > 0) {
			latestConnection = allConnections[allConnections.length - 1];
		} else {
			latestConnection = { int: -1 };
		}
		const latestInt = parseInt(latestConnection.int);
		let newConnection = { int: String(latestInt + 2) };

		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		newConnection.userId_1 = currentUser.id;
		newConnection.userId_2 = userId;

		await database.connections.create(newConnection);
		res.status(201).json(newConnection);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with creating Session. Please retry.",
		});
	}
}

async function deleteConnection(req, res, next) {
	try {
		// Using Connection unique id to check whether it exists and is available to delete
		const { id } = req.params; // Connection unique id
		const currentConnection = await database.connections.findOne({
			raw: true,
			where: { int: id },
		});
		if (currentConnection == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Connection does not exist." });
		}

		// Delete the Connection
		const deleted = await database.connections.destroy({ where: { int: id } });
		if (deleted) {
			return res
				.status(201)
				.json({ code: "success", message: "Connection successfully deleted." });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with deleting Connection. Please retry.",
		});
	}
}

module.exports = connectionsController;

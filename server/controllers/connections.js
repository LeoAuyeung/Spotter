var database = require('../models');

const connectionsController = {
	getAllConnections: getAllConnections,
};

async function getAllConnections(req, res, next) {
	try {
		const allConnections = await database.connections.findAll();
		res.status(200).json(allConnections);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = connectionsController;
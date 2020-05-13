var database = require('../models');

const sessionConfirmationsController = {
	getAllSessionConfirmations: getAllSessionConfirmations,
};

async function getAllSessionConfirmations(req, res, next) {
	try {
		const allSessionConfirmations = await database.sessionConfirmations.findAll();
		res.status(200).json(allSessionConfirmations);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = sessionConfirmationsController;
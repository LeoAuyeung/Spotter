var database = require('../models');

const traitsController = {
	getAllTraits: getAllTraits,
};

async function getAllTraits(req, res, next) {
	try {
		var allTraits = await database.traits.findAll();
		res.status(200).json(allTraits);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = traitsController;
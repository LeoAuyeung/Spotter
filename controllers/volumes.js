var database = require('../models');

const volumesController = {
	getAllVolumes: getAllVolumes,
};

async function getAllVolumes(req, res, next) {
	try {
		var allVolumes = await database.volumes.findAll();
		res.status(200).json(allVolumes);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = volumesController;
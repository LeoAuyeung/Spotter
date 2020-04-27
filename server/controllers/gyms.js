var database = require('../models');

const gymsController = {
	getAllGyms: getAllGyms,
};

async function getAllGyms(req, res, next) {
	try {
		const allGyms = await database.gyms.findAll();
		res.status(200).json(allGyms);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = gymsController;
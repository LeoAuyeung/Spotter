var database = require('../models');

const daysController = {
	getAllDays: getAllDays,
};

async function getAllDays(req, res, next) {
	try {
		const allDays = await database.days.findAll();
		res.status(200).json(allDays);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = daysController;
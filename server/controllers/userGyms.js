var database = require('../models');

const userGymsController = {
	getAllUserGyms: getAllUserGyms,
};

async function getAllUserGyms(req, res, next) {
	try {
		const allUserGyms = await database.userGyms.findAll();
		res.status(200).json(allUserGyms);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = userGymsController;
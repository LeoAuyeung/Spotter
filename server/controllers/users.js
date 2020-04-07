
var database = require('../models');


const userController = {
	getAllUsers: getAllUsers,
};

async function getAllUsers(req, res, next) {
	try {
		var allUsers = await database.users.findAll();
		res.status(200).json(allUsers);
	} catch (err) {
		console.log(err);
	}
}

module.exports = userController;
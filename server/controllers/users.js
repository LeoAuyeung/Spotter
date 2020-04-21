
var database = require('../models');
const accessTokenSecret = 'youraccesstokensecret';
const jwt = require('jsonwebtoken');

//const protectedRouter = withJWTAuthMiddleware(router, accessTokenSecret);


const userController = {
	getAllUsers: getAllUsers,
	loginUser: loginUser,
};

async function getAllUsers(req, res, next) {
	try {
		var allUsers = await database.users.findAll();
		res.status(200).json(allUsers);
	} catch (err) {
		console.log(err);
	}
}

async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await database.users.findOne({  raw: true , where: {email: email, password: password} });
		if (user) {
			const accessToken = jwt.sign({ email: user.email}, accessTokenSecret);
			res.status(200).json({accessToken});
		} else {
			res.status(401).json({ code: "error", message: "Username or password is wrong." });
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = userController;
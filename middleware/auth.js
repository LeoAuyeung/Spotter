const jwt = require("jsonwebtoken");
var database = require("../models");

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader;

		jwt.verify(token, "youraccesstokensecret", (err, email) => {
			if (err) {
				return res.sendStatus(403);
			}

			req.email = email;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};
module.exports = auth;

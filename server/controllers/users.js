var database = require("../models");
var usersModel = require("../models/users");
var decodeJwt = require("../middleware/decodeJwt");

const accessTokenSecret = "youraccesstokensecret";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;

//const protectedRouter = withJWTAuthMiddleware(router, accessTokenSecret);

const userController = {
	getAllUsers,
	loginUser,
	registerUser,
	decodeJwtToken,
	me,
};

async function getAllUsers(req, res, next) {
	try {
		const decoded = await decodeJwt(req.headers);
		console.log(decoded.email);
		var allUsers = await database.users.findAll();
		res.status(200).json(allUsers);
	} catch (err) {
		console.log(err);
	}
}

async function decodeJwtToken(req, res, next) {
	try {
		const decoded = await decodeJwt(req.headers);
		res.status(200).json(decoded);
	} catch (err) {
		console.log(err);
		res.status(401).json({ code: "error", message: "Jwt cannot be decoded." });
	}
}

async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await database.users.findOne({
			raw: true,
			where: { email: email },
		});
		if (user) {
			const match = await bcrypt.compare(password, user.password);
			console.log(match);
			if (match) {
				const accessToken = jwt.sign({ email: user.email }, accessTokenSecret);
				res.status(200).json({ accessToken });
			} else {
				res
					.status(401)
					.json({ code: "error", message: "Email or password is wrong." });
			}
		} else {
			res
				.status(401)
				.json({ code: "error", message: "Email or password is wrong." });
		}
	} catch (err) {
		console.log(err);
		res
			.status(401)
			.json({ code: "error", message: "Error logging in, please try again." });
	}
}

async function registerUser(req, res, next) {
	try {
		let newUser = req.body;
		const userExists = await database.users.findOne({
			where: { email: newUser.email },
		});
		if (!userExists) {
			let hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
			newUser.password = hashedPassword;
			await database.users.create(newUser);
			res.status(200).json({ code: "Success", message: "User created" });
		} else {
			res.status(401).json({ code: "error", message: "Email exists." });
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({
			code: "error",
			message: "Error with creating account. Please retry.",
		});
	}
}

async function me(req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		if (authHeader) {
			const token = authHeader;
			jwt.verify(token, "youraccesstokensecret", (err, email) => {
				if (!err) {
					return res.status(200).send({ email: email.email });
				}
			});
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = userController;

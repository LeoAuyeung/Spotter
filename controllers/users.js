var database = require("../models");
var usersModel = require("../models/users");
var decodeJwt = require("../middleware/decodeJwt");
const { Op } = require("sequelize");

const accessTokenSecret = "youraccesstokensecret";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;

//const protectedRouter = withJWTAuthMiddleware(router, accessTokenSecret);

const userController = {
	getAllUsers,
	getFilteredUsers,
	loginUser,
	registerUser,
	decodeJwtToken,
	me,
	profile,
	otherProfile,
	editUserBio,
};

async function getAllUsers(req, res, next) {
	try {
		const decoded = await decodeJwt(req.headers);
		var allUsers = await database.users.findAll();
		res.status(200).json(allUsers);
	} catch (err) {
		console.log(err);
	}
}

// getFilteredUsers will filter depending on input, sent in req.body
async function getFilteredUsers(req, res, next) {
	try {
		const decoded = await decodeJwt(req.headers);
		let allUserFilters = req.body;
		// Supporting multiple filter by: userGyms, userTraits
		// Call function with JSON body as such:
		/*
		{
			"userGymIdList": [1],
			"userTraitIdList": [2, 3]
		}
		*/

		// If there are gym ids, search userGyms by traitId
		let userGymsFilter = [];
		if (allUserFilters.userGymIdList.length != 0) {
			userGymsFilter = await database.userGyms.findAll({
				raw: true,
				where: {
					gymId: {
						[Op.or]: allUserFilters.userGymIdList,
					},
				},
			});
		}
		// If there are usertraits, search userTraits by traitId
		let userTraitsFilter = [];
		if (allUserFilters.userTraitIdList.length != 0) {
			userTraitsFilter = await database.userTraits.findAll({
				raw: true,
				where: {
					traitId: {
						[Op.or]: allUserFilters.userTraitIdList,
					},
				},
			});
		}

		// Then, add all these userIds into a master list of userIds to search by
		const allUserIds = userGymsFilter
			.concat(userTraitsFilter)
			.map((item) => item.userId);

		// Then, search users by userIds (automatically removes duplicates this way)
		// May return empty list if no users match all requirements
		var allFilteredUsers = await database.users.findAll({
			raw: true,
			where: {
				id: {
					[Op.or]: allUserIds,
				},
			},
		});

		res.status(200).json(allFilteredUsers);
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
					console.log(err);
					return res.status(200).send({ email: email.email });
				}
			});
		}
	} catch (err) {
		console.log(err);
	}
}
async function profile(req, res, next) {
	try {
		let newSchedule = req.body;
		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		let connectionsList = await database.connections.findAll({
			raw: true,
			where: { userId_1: currentUser.id },
		});
		var connectionProfiles = await Promise.all(
			connectionsList.map(async (connectionElement) => {
				const partnerUser = await database.users.findOne({
					raw: true,
					where: { id: connectionElement.userId_2 },
				});
				return partnerUser;
			})
		).then((completed) => {
			return completed;
		});
		let userWorkoutVolumeList = await database.userWorkoutVolumes.findAll({
			raw: true,
			where: { userId: currentUser.id },
		});

		var userWorkoutVolumeJoined = await Promise.all(
			userWorkoutVolumeList.map(async (uwvElement) => {
				const workoutName = await database.workouts.findOne({
					raw: true,
					where: { id: uwvElement.workoutId },
				});
				const volumeName = await database.volumes.findOne({
					raw: true,
					where: { id: uwvElement.volumeId },
				});
				let workoutObj = {
					workoutId: uwvElement.workoutId,
					workout: workoutName,
					volume: volumeName,
					amount: uwvElement.maxNumber,
				};
				return workoutObj;
			})
		).then((completed) => {
			return completed;
		});

		let userGymsList = await database.userGyms.findAll({
			raw: true,
			where: { userId: currentUser.id },
		});
		console.log(userGymsList);
		var userGymsListJoined = await Promise.all(
			userGymsList.map(async (gymElement) => {
				const gymInfo = await database.gyms.findOne({
					raw: true,
					where: { id: gymElement.gymId },
				});
				return gymInfo;
			})
		).then((completed) => {
			return completed;
		});

		var userFeedList = await Promise.all(
			connectionsList.map(async (connectionElement) => {
				const feedInfo = await database.activityFeed.findOne({
					raw: true,
					where: { userId: connectionElement.userId_2 },
				});
				const connectProfile = await database.users.findOne({
					raw: true,
					where: { id: connectionElement.userId_2 },
				});
				let retFeedInfo = { feedUser: connectProfile, feed: feedInfo };
				return retFeedInfo;
			})
		).then((completed) => {
			return completed;
		});
		let retObj = {
			profile: currentUser,
			connections: connectionProfiles,
			workouts: userWorkoutVolumeJoined,
			gyms: userGymsListJoined,
			feed: userFeedList,
		};
		return res.send(retObj);
	} catch (err) {
		console.log(err);
		res.status(401).json({ code: "error", message: "Profile does not exist" });
	}
}

async function otherProfile(req, res, next) {
	try {
		let newSchedule = req.body;
		let decodedJwt = await decodeJwt(req.headers);
		const { id } = req.params;
		let currentUser = await database.users.findOne({
			raw: true,
			where: { id: id },
		});
		let connectionsList = await database.connections.findAll({
			raw: true,
			where: { userId_1: currentUser.id },
		});
		var connectionProfiles = await Promise.all(
			connectionsList.map(async (connectionElement) => {
				const partnerUser = await database.users.findOne({
					raw: true,
					where: { id: connectionElement.userId_2 },
				});
				return partnerUser;
			})
		).then((completed) => {
			return completed;
		});
		let userWorkoutVolumeList = await database.userWorkoutVolumes.findAll({
			raw: true,
			where: { userId: currentUser.id },
		});
		var userWorkoutVolumeJoined = await Promise.all(
			userWorkoutVolumeList.map(async (uwvElement) => {
				const workoutName = await database.workouts.findOne({
					raw: true,
					where: { id: uwvElement.workoutId },
				});
				const volumeName = await database.volumes.findOne({
					raw: true,
					where: { id: uwvElement.volumeId },
				});
				let workoutObj = {
					workoutId: uwvElement.workoutId,
					workout: workoutName,
					volume: volumeName,
					amount: uwvElement.maxNumber,
				};
				return workoutObj;
			})
		).then((completed) => {
			return completed;
		});

		let userGymsList = await database.userGyms.findAll({
			raw: true,
			where: { userId: currentUser.id },
		});
		console.log(userGymsList);
		var userGymsListJoined = await Promise.all(
			userGymsList.map(async (gymElement) => {
				const gymInfo = await database.gyms.findOne({
					raw: true,
					where: { id: gymElement.gymId },
				});
				return gymInfo;
			})
		).then((completed) => {
			return completed;
		});

		var userFeedList = await Promise.all(
			connectionsList.map(async (connectionElement) => {
				const feedInfo = await database.activityFeed.findOne({
					raw: true,
					where: { userId: connectionElement.userId_2 },
				});
				const connectProfile = await database.users.findOne({
					raw: true,
					where: { id: connectionElement.userId_2 },
				});
				let retFeedInfo = { feedUser: connectProfile, feed: feedInfo };
				return retFeedInfo;
			})
		).then((completed) => {
			return completed;
		});
		let retObj = {
			profile: currentUser,
			connections: connectionProfiles,
			workouts: userWorkoutVolumeJoined,
			gyms: userGymsListJoined,
			feed: userFeedList,
		};
		return res.send(retObj);
	} catch (err) {
		console.log(err);
		res.status(401).json({ code: "error", message: "Profile does not exist" });
	}
}

async function editUserBio(req, res, next) {
	try {
		const decodedJwt = await decodeJwt(req.headers);
		var currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		const newBio = req.body.bio;
		currentUser.bio = newBio;
		const [updated] = await database.users.update(currentUser, {
			where: { id: currentUser.id },
		});
		if (updated) {
			const updatedUser = await database.users.findOne({
				where: { id: currentUser.id },
			});
			return res.status(200).json({ updatedUser });
		} else {
			return res.status(200).json({ currentUser });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with updating UserWorkoutVolume. Please retry.",
		});
	}
}

module.exports = userController;

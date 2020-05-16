var database = require("../models");
var usersModel = require("../models/sessions");
var decodeJwt = require("../middleware/decodeJwt");

const sessionsController = {
	getAllSessions: getAllSessions,
	createSession: createSession,
	editSession: editSession,
	deleteSession: deleteSession,
	acceptSession: acceptSession,
	denySession: denySession,
};

async function getAllSessions(req, res, next) {
	try {
		var allSessions = await database.sessions.findAll();
		res.status(200).json(allSessions);
	} catch (err) {
		console.log(err);
	}
}

async function createSession(req, res, next) {
	try {
		var newSession = req.body.session;
		var inviteUserId = req.body.inviteUserId;
		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		let inviteUser = await database.users.findOne({
			raw: true,
			where: { id: inviteUserId },
		});
		newSession.ownerId = currentUser.id;
		newSession.isConfirmed = false;
		let createdSession = await database.sessions.create(newSession);
		let ownerSessionConfirmationOwner = {
			sessionId: createdSession.dataValues.id,
			userId: currentUser.id,
			isConfirmed: true,
		};
		let ownerSessionConfirmationInvited = {
			sessionId: createdSession.dataValues.id,
			userId: inviteUser.id,
			isConfirmed: false,
		};
		let inviteOne = await database.sessionConfirmations.create(
			ownerSessionConfirmationOwner
		);
		let inviteTwo = await database.sessionConfirmations.create(
			ownerSessionConfirmationInvited
		);

		let newNotificationOwner = {
			userId: currentUser.id,
			sessionId: createdSession.id,
			message:
				"Session with " +
				currentUser.email +
				"and " +
				inviteUser.email +
				" created.",
			read: false,
		};
		let newNotificationCreated = {
			userId: inviteUser.id,
			sessionId: createdSession.id,
			message:
				"Session with " +
				currentUser.email +
				"and " +
				inviteUser.email +
				" created.",
			read: false,
		};

		let createdNotificationOwner = await database.notifications.create(
			newNotificationOwner
		);
		let createdNotificationInvited = await database.notifications.create(
			newNotificationCreated
		);
		res.status(201).json({
			session: createdSession,
			ownerConfirmation: inviteOne,
			invitedConfirmation: inviteTwo,
			notificationOwner: createdNotificationOwner,
			notificationInvited: createdNotificationInvited,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with creating Session. Please retry.",
		});
	}
}

async function editSession(req, res, next) {
	try {
		const { id } = req.params;
		const currentSession = await database.sessions.findOne({
			raw: true,
			where: { id: id },
		});
		if (currentSession == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Session does not exist." });
		}
		let newSession = req.body;

		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});

		if (Number(currentUser.id) != currentSession.ownerId) {
			return res
				.status(401)
				.json({ code: "error", message: "Unauthorized to edit." });
		}
		if (req.body.id && Number(req.body.id) != currentSession.ownerId) {
			return res
				.status(401)
				.json({ code: "error", message: "Unauthorized to edit." });
		}
		const [updated] = await database.sessions.update(req.body, {
			where: { id: id },
		});
		if (updated) {
			const updatedSessions = await database.sessions.findOne({
				where: { id: id },
			});
			return res.status(200).json({ updatedSessions });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with updating Session. Please retry.",
		});
	}
}

async function acceptSession(req, res, next) {
	try {
		const { id } = req.params;
		const currentSession = await database.sessions.findOne({
			raw: true,
			where: { id: id },
		});
		if (currentSession == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Session does not exist." });
		}

		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		var toUpdateSession = await database.sessionConfirmations.findOne({
			raw: true,
			where: { sessionId: currentSession.id, userId: currentUser.id },
		});
		toUpdateSession.isConfirmed = true;

		var [
			updatedSessionConfirmation,
		] = await database.sessionConfirmations.update(toUpdateSession, {
			where: { id: toUpdateSession.id },
		});
		let currentConfirmationCount = await database.sessionConfirmations.findAll({
			raw: true,
			where: { sessionId: id, isConfirmed: true },
		});
		if (currentConfirmationCount.length == 2) {
			var afterConfirmSession = await database.sessions.findOne({
				raw: true,
				where: { id: id },
			});
			afterConfirmSession.isConfirmed = true;
			var updatedSession = await database.sessions.update(afterConfirmSession, {
				where: { id: afterConfirmSession.id },
			});
			var allNotifications = await Promise.all(
				currentConfirmationCount.map(async (uwvElement) => {
					var userTwo = await database.users.findOne({
						raw: true,
						where: { id: uwvElement.userId },
					});

					var newNotificationOwner = {
						userId: userTwo.id,
						sessionId: currentSession.id,
						message:
							"Session with " +
							currentUser.email +
							"and " +
							userTwo.email +
							" confirmed.",
						read: false,
					};
					var createdNotificationOwner = await database.notifications.create(
						newNotificationOwner
					);
					return createdNotificationOwner;
				})
			).then((completed) => {
				return completed;
			});

			res.status(201).json({ updatedSession });
		} else {
			res.status(201).json({ currentSession });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with updating Session. Please retry.",
		});
	}
}

async function denySession(req, res, next) {
	try {
		const { id } = req.params;
		const currentSession = await database.sessions.findOne({
			raw: true,
			where: { id: id },
		});
		if (currentSession == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Session does not exist." });
		}
		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		var toUpdateSession = await database.sessionConfirmations.findOne({
			raw: true,
			where: { sessionId: currentSession.id, userId: currentUser.id },
		});
		toUpdateSession.isConfirmed = false;

		var [
			updatedSessionConfirmation,
		] = await database.sessionConfirmations.update(toUpdateSession, {
			where: { id: toUpdateSession.id },
		});
		let currentConfirmationCount = await database.sessionConfirmations.findAll({
			raw: true,
			where: { sessionId: id, isConfirmed: false },
		});
		if (currentConfirmationCount.length == 2) {
			var afterConfirmSession = await database.sessions.findOne({
				raw: true,
				where: { id: id },
			});
			afterConfirmSession.isConfirmed = false;
			var updatedSession = await database.sessions.update(afterConfirmSession, {
				where: { id: afterConfirmSession.id },
			});
			var allNotifications = await Promise.all(
				currentConfirmationCount.map(async (uwvElement) => {
					var userTwo = await database.users.findOne({
						raw: true,
						where: { id: uwvElement.userId },
					});
					var newNotificationOwner = {
						userId: userTwo.id,
						sessionId: currentSession.id,
						message:
							"Session with " +
							currentUser.email +
							"and " +
							userTwo.email +
							" denied.",
						read: false,
					};
					var createdNotificationOwner = await database.notifications.create(
						newNotificationOwner
					);
					return createdNotificationOwner;
				})
			).then((completed) => {
				return completed;
			});
			res.status(201).json({ updatedSession });
		} else {
			res.status(201).json({ currentSession });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with updating Session. Please retry.",
		});
	}
}

async function deleteSession(req, res, next) {
	try {
		const { id } = req.params;
		const currentSession = await database.sessions.findOne({
			raw: true,
			where: { id: id },
		});
		if (currentSession == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Session does not exist." });
		}

		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		if (Number(currentUser.id) != currentSession.ownerId) {
			return res
				.status(401)
				.json({ code: "error", message: "Unauthorized to delete." });
		}
		const deleted = await database.sessions.destroy({ where: { id: id } });
		if (deleted) {
			return res
				.status(201)
				.json({ code: "success", message: "Session Deleted." });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with deleting Session. Please retry.",
		});
	}
}
module.exports = sessionsController;

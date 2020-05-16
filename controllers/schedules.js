var database = require("../models");
var usersModel = require("../models/schedules");
var decodeJwt = require("../middleware/decodeJwt");
const { Op } = require("sequelize");

const schedulesController = {
	getAllSchedules: getAllSchedules,
	getSchedules: getSchedules,
	createSchedule: createSchedule,
	editSchedule: editSchedule,
	deleteSchedule: deleteSchedule,
	getScheduleOverlaps: getScheduleOverlaps,
};

async function getAllSchedules(req, res, next) {
	try {
		var allSchedules = await database.schedules.findAll();
		res.status(200).json(allSchedules);
	} catch (err) {
		console.log(err);
	}
}

async function getSchedules(req, res, next) {
	try {
		const decodedJwt = await decodeJwt(req.headers);
		const currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		const schedules = await database.schedules.findAll({
			raw: true,
			where: { userId: currentUser.id },
		});
		schedules.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

		res.status(200).json(schedules);
	} catch (err) {
		console.log(err);
	}
}

async function createSchedule(req, res, next) {
	try {
		let newSchedule = req.body;
		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});

		let allSchedules = await database.schedules.findAll({
			raw: true,
			where: {
				[Op.and]: {
					userId: currentUser.id,
					dayId: newSchedule.dayId,
				},
			},
		});

		allSchedules.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
		const start = newSchedule.startTime;
		const end = newSchedule.endTime;

		for (let i = 0; i < allSchedules.length; i++) {
			const item = allSchedules[i];
			const startTime = item.startTime;
			const endTime = item.endTime;

			if (
				(start >= startTime && (start <= endTime || end >= endTime)) ||
				(end >= startTime && (start <= startTime || end >= startTime))
			) {
				console.log("Error inserting schedule interval.");
				return res.status(500).json({
					code: "error",
					message:
						"New Schedule cannot overlap with existing Schedule. Please retry.",
				});
			}
		}

		newSchedule.userId = currentUser.id;
		const newCreatedSchedule = await database.schedules.create(newSchedule);
		res.status(201).json(newCreatedSchedule);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with creating Schedule. Please retry.",
		});
	}
}

async function editSchedule(req, res, next) {
	try {
		const { id } = req.params;
		const currentSchedule = await database.schedules.findOne({
			raw: true,
			where: { id: id },
		});
		if (currentSchedule == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Schedule does not exist." });
		}
		let newSchedule = req.body;

		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});

		if (Number(currentUser.id) != currentSchedule.userId) {
			return res
				.status(401)
				.json({ code: "error", message: "Unauthorized to edit." });
		}
		if (req.body.id && Number(req.body.id) != currentSchedule.userId) {
			return res
				.status(401)
				.json({ code: "error", message: "Unauthorized to edit." });
		}
		const [updated] = await database.schedules.update(req.body, {
			where: { id: id },
		});
		if (updated) {
			const updatedSchedule = await database.schedules.findOne({
				where: { id: id },
			});
			return res.status(200).json({ updatedSchedule });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with updating Schedule. Please retry.",
		});
	}
}

async function deleteSchedule(req, res, next) {
	try {
		const { id } = req.params;
		const currentSchedule = await database.schedules.findOne({
			raw: true,
			where: { id: id },
		});
		if (currentSchedule == null) {
			return res
				.status(401)
				.json({ code: "error", message: "Schedule does not exist." });
		}

		let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({
			raw: true,
			where: { email: decodedJwt.email },
		});
		if (Number(currentUser.id) != currentSchedule.userId) {
			return res
				.status(401)
				.json({ code: "error", message: "Unauthorized to delete." });
		}
		const deleted = await database.schedules.destroy({ where: { id: id } });
		if (deleted) {
			return res
				.status(201)
				.json({ code: "success", message: "Schedule Deleted." });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			code: "error",
			message: "Error with deleting Schedule. Please retry.",
		});
	}
}

async function getScheduleOverlaps(req, res, next) {
	try {
		console.log("sfubqafoaqbsfo");
		const { userId_1, userId_2 } = req.body;

		var user1_sched = await database.schedules.findAll({
			raw: true,
			where: { userId: userId_1 },
		});
		var user2_sched = await database.schedules.findAll({
			raw: true,
			where: { userId: userId_2 },
		});

		var user1_map = {
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
		};
		for (let i = 0; i < user1_sched.length; i++) {
			const item = user1_sched[i];
			const dayId = item.dayId;
			user1_map[dayId] = user1_map[dayId].concat(item);
		}

		var user2_map = {
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
		};
		for (let i = 0; i < user2_sched.length; i++) {
			const item = user2_sched[i];
			const dayId = item.dayId;
			user2_map[dayId] = user2_map[dayId].concat(item);
		}

		var returnMap = {
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
		};
		const retLen = Object.keys(returnMap).length; // Grab json obj length of returnMap

		var ans = [];
		// Intersection algorithm: implemented a custom version of: https://leetcode.com/problems/interval-list-intersections/
		for (let i = 0; i < retLen; i++) {
			let a = 0;
			let b = 0;
			const item1 = user1_map[i + 1];
			const item2 = user2_map[i + 1];
			ans = [];
			while (a < item1.length && b < item2.length) {
				let lo =
					item1[a].startTime > item2[b].startTime
						? item1[a].startTime
						: item2[b].startTime;
				let hi =
					item1[a].endTime < item2[b].endTime
						? item1[a].endTime
						: item2[b].endTime;
				if (lo <= hi) {
					ans.push([lo, hi]);
				}
				if (item1[a].endTime < item2[b].endTime) {
					a++;
				} else {
					b++;
				}
			}
			// Set answer
			returnMap[i + 1] = ans;
		}

		res.status(200).json(returnMap);
	} catch (err) {
		console.log(err);
	}
}

module.exports = schedulesController;

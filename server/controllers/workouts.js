var database = require('../models');


const workoutController = {
	getAllWorkouts: getAllWorkouts,
};

async function getAllWorkouts(req, res, next) {
	try {
		var allWorkouts = await database.workouts.findAll();
		res.status(200).json(allWorkouts);
	} catch (err) {
		console.log(err);
	}
}

module.exports = workoutController;
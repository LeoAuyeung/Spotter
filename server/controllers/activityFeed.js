var database = require('../models');

const activityFeedController = {
	getAllActivityFeed: getAllActivityFeed,
};

async function getAllActivityFeed(req, res, next) {
	try {
		const allActivityFeed = await database.activityFeed.findAll();
		res.status(200).json(allActivityFeed);
    }
    catch (err) {
		console.log(err);
	}
}

module.exports = activityFeedController;
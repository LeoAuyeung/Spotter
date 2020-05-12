var database = require('../models');
var decodeJwt = require('../middleware/decodeJwt');

const userGymsController = {
	getAllUserGyms: getAllUserGyms,
	getUserGyms: getUserGyms,
	createUserGym: createUserGym,
	deleteUserGym: deleteUserGym,
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


async function getUserGyms(req, res, next) {
	try {
        let decodedJwt = await decodeJwt(req.headers);
		let currentUser = await database.users.findOne({ raw: true , where: { email: decodedJwt.email } });

		// Get all userGyms of current user
		const userGyms = await database.userGyms.findAll({ raw: true , where: { userId: currentUser.id } });

		res.status(200).json(userGyms);
    }
    catch (err) {
		console.log(err);
	}
}

async function createUserGym(req, res, next) {
	try {
		const { gymId } = req.params; // Id of gym that you are connecting to
		
		const allUserGyms = await database.userGyms.findAll();
		let latestUserGym;
		if (allUserGyms.length > 0) {
			latestUserGym = allUserGyms[allUserGyms.length-1];
		}
		else {
			latestUserGym = { "id": -1 };
		}
		const latestId = parseInt(latestUserGym.id);
		let newUserGym = { "id": String(latestId + 1) };
		
        let decodedJwt = await decodeJwt(req.headers);
        let currentUser = await database.users.findOne({ raw: true , where: { email: decodedJwt.email } });
        newUserGym.userId = currentUser.id;
		newUserGym.gymId = gymId;
		
        await database.userGyms.create(newUserGym);
        res.status(201).json(newUserGym);
	}
	catch (err) {
		console.log(err);
		return res.status(500).json({ code: "error", message: "Error with creating UserGym. Please retry." });
	}
}

async function deleteUserGym(req, res, next) {
	try {
        // Using UserGym unique id to check whether it exists and is available to delete
        const { id } = req.params; // UserGym unique id
        const currentUserGym = await database.userGyms.findOne({ raw: true , where: { id: id } });
        if (currentUserGym == null) {
            return res.status(401).json({ code: "error", message: "UserGym does not exist." });
        }
        
        // Delete the UserGym
        const deleted = await database.userGyms.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(201).json({ code: "success", message: "UserGym successfully deleted." });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ code: "error", message: "Error with deleting UserGym. Please retry." });
	}
}

module.exports = userGymsController;
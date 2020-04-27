
var database = require('../models');
var decodeJwt = require('../middleware/decodeJwt');

const userWorkoutVolumesController = {
    getAllUserWorkoutVolumes: getAllUserWorkoutVolumes,
    createUserWorkoutVolume: createUserWorkoutVolume,
    editUserWorkoutVolume: editUserWorkoutVolume,
    deleteUserWorkoutVolume: deleteUserWorkoutVolume,
};

async function getAllUserWorkoutVolumes(req, res, next) {
	try {
		var allUserWorkoutVolumes = await database.userWorkoutVolumes.findAll();
		res.status(200).json(allUserWorkoutVolumes);
    }
    catch (err) {
		console.log(err);
	}
}

async function createUserWorkoutVolume(req, res, next) {
	try {
        // Using currentUser unique id to create a new UserWorkoutVolume for the user
        let newUserWorkoutVolume = req.body;
        const decodedJwt = await decodeJwt(req.headers);
        const currentUser = await database.users.findOne({ raw: true , where: { email: decodedJwt.email } });
        newUserWorkoutVolume.userId = currentUser.id;

        // Create the UserWorkoutVolume
        await database.userWorkoutVolumes.create(newUserWorkoutVolume);
        res.status(201).json(newUserWorkoutVolume);
    }
    catch (err) {
		console.log(err);
		return res.status(500).json({ code: "error", message: "Error with creating UserWorkoutVolume. Please retry." });
	}
}

async function editUserWorkoutVolume(req, res, next) {
	try {
        // Using UserWorkoutVolume unique id to check whether it exists and is available to update
        const { id } = req.params; // UserWorkoutVolume unique id
        const currentUserWorkoutVolume = await database.userWorkoutVolumes.findOne({ raw: true , where: { id: id } });
        if (currentUserWorkoutVolume == null) {
            return res.status(401).json({ code: "error", message: "UserWorkoutVolume does not exist." });
        }

        // Using jwt to check whether the current user is updating own UserWorkoutVolume
        const decodedJwt = await decodeJwt(req.headers);
        const currentUser = await database.users.findOne({ raw: true , where: { email: decodedJwt.email } });
        if ((Number(currentUser.id) != currentUserWorkoutVolume.userId) 
        || (req.body.id && (Number(req.body.id) != currentUserWorkoutVolume.userId))) {
            return res.status(401).json({ code: "error", message: "Unauthorized to edit." });
        }

        // Update the UserWorkoutVolume
        const newUserWorkoutVolume = req.body; // Updated (new) UserWorkoutVolume
        const [ updated ] = await database.userWorkoutVolumes.update(newUserWorkoutVolume, { where: { id: id } });
        if (updated) {
            const updatedUserWorkoutVolume = await database.userWorkoutVolumes.findOne({ where: { id: id } });
            return res.status(200).json({ updatedUserWorkoutVolume });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ code: "error", message: "Error with updating UserWorkoutVolume. Please retry." });
	}
}

async function deleteUserWorkoutVolume(req, res, next) {
	try {
        // Using UserWorkoutVolume unique id to check whether it exists and is available to delete
        const { id } = req.params; // UserWorkoutVolume unique id
        const currentUserWorkoutVolume = await database.userWorkoutVolumes.findOne({ raw: true , where: { id: id } });
        if (currentUserWorkoutVolume == null) {
            return res.status(401).json({ code: "error", message: "UserWorkoutVolume does not exist." });
        }
        
        // Using jwt to check whether the current user is updating own UserWorkoutVolume
        const decodedJwt = await decodeJwt(req.headers);
        const currentUser = await database.users.findOne({ raw: true , where: { email: decodedJwt.email } })
        if (Number(currentUser.id) != currentUserWorkoutVolume.userId) {
            return res.status(401).json({ code: "error", message: "Unauthorized to delete." });
        }
        
        // Delete the UserWorkoutVolume
        const deleted = await database.userWorkoutVolumes.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(201).json({ code: "success", message: "UserWorkoutVolume successfully deleted." });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ code: "error", message: "Error with deleting UserWorkoutVolume. Please retry." });
	}
}

module.exports = userWorkoutVolumesController;
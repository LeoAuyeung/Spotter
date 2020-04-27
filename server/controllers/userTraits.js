
var database = require('../models');
var decodeJwt = require('../middleware/decodeJwt');

const userTraitsController = {
    getAllUserTraits: getAllUserTraits,
    createUserTrait: createUserTrait,
    editUserTrait: editUserTrait,
    deleteUserTrait: deleteUserTrait,
};

async function getAllUserTraits(req, res, next) {
	try {
		var allUserTraits = await database.userTraits.findAll();
		res.status(200).json(allUserTraits);
    }
    catch (err) {
		console.log(err);
	}
}

async function createUserTrait(req, res, next) {
	try {
        // Using id of user whose trait is being edited
        const { userId } = req.params; // UserTrait unique id
        let newUserTrait = req.body; // New UserTrait
        newUserTrait.userId = userId;

        // Create the UserTrait
        await database.userTraits.create(newUserTrait);
        res.status(201).json(newUserTrait);
    }
    catch (err) {
		console.log(err);
		return res.status(500).json({ code: "error", message: "Error with creating UserTrait. Please retry." });
	}
}

async function editUserTrait(req, res, next) {
	try {
        // Using UserTrait unique id to check whether it exists and is available to update
        const { id } = req.params; // UserTrait unique id
        const currentUserTrait = await database.userTraits.findOne({ raw: true , where: { id: id } });
        if (currentUserTrait == null) {
            return res.status(401).json({ code: "error", message: "UserTrait does not exist." });
        }

        // Update the UserTrait
        const newUserTrait = req.body; // Updated (new) UserTrait
        const [ updated ] = await database.userTraits.update(newUserTrait, { where: { id: id } });
        if (updated) {
            const updatedUserTrait = await database.userTraits.findOne({ where: { id: id } });
            return res.status(200).json({ updatedUserTrait });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ code: "error", message: "Error with updating UserTrait. Please retry." });
	}
}

async function deleteUserTrait(req, res, next) {
	try {
        // Using UserTrait unique id to check whether it exists and is available to delete
        const { id } = req.params; // UserTrait unique id
        const currentUserTrait = await database.userTraits.findOne({ raw: true , where: { id: id } });
        if (currentUserTrait == null) {
            return res.status(401).json({ code: "error", message: "UserTrait does not exist." });
        }
        
        // Using jwt to check whether the current user is updating own UserTrait
        const decodedJwt = await decodeJwt(req.headers);
        const currentUser = await database.users.findOne({ raw: true , where: { email: decodedJwt.email } })
        if (Number(currentUser.id) != currentUserTrait.userId) {
            return res.status(401).json({ code: "error", message: "Unauthorized to delete." });
        }
        
        // Delete the UserTrait
        const deleted = await database.userTraits.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(201).json({ code: "success", message: "UserTrait successfully deleted." });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ code: "error", message: "Error with deleting UserTrait. Please retry." });
	}
}

module.exports = userTraitsController;
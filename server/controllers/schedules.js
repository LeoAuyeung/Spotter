
var database = require('../models');
var usersModel = require('../models/schedules');
var decodeJwt = require('../middleware/decodeJwt');

const schedulesController = {
    getAllSchedules: getAllSchedules,
    createSchedule: createSchedule,
    editSchedule: editSchedule,
    deleteSchedule: deleteSchedule,

};

async function getAllSchedules(req, res, next) {
	try {
		var allSchedules = await database.schedules.findAll();
		res.status(200).json(allSchedules);
	} catch (err) {
		console.log(err);
	}
}

async function createSchedule(req, res, next) {
	try {
        let newSchedule = req.body;
        
        let decodedJwt = await decodeJwt(req.headers);

        let currentUser = await database.users.findOne({  raw: true , where: {email: decodedJwt.email} })
        newSchedule.userId = currentUser.id;
        const newCreatedSchedule =await database.schedules.create(newSchedule);
        res.status(201).json(newCreatedSchedule);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ code: "error", message: "Error with creating Schedule. Please retry." });
	}
}

async function editSchedule(req, res, next) {
	try {
        const { id } = req.params;
        const currentSchedule = await database.schedules.findOne({  raw: true , where: {id: id} });
        if (currentSchedule == null){
            return res.status(401).json({ code: "error", message: "Schedule does not exist." });
        }
        let newSchedule = req.body;
        
        let decodedJwt = await decodeJwt(req.headers);
        let currentUser = await database.users.findOne({  raw: true , where: {email: decodedJwt.email} })

        if ((Number(currentUser.id) != currentSchedule.userId)){
            return res.status(401).json({ code: "error", message: "Unauthorized to edit." });
        }
        if (req.body.id && (Number(req.body.id) != currentSchedule.userId)){
            return res.status(401).json({ code: "error", message: "Unauthorized to edit." });
        }
        const [ updated ] = await database.schedules.update(req.body, {where: { id: id }});
        if (updated) {
            const updatedSchedule = await database.schedules.findOne({ where: { id: id } });
            return res.status(200).json({ updatedSchedule });
        }
	} catch (err) {
        console.log(err);
        return res.status(500).json({ code: "error", message: "Error with updating Schedule. Please retry." });
	}
}


async function deleteSchedule(req, res, next) {
	try {
        const { id } = req.params;
        const currentSchedule = await database.schedules.findOne({  raw: true , where: {id: id} });
        if (currentSchedule == null){
            return res.status(401).json({ code: "error", message: "Schedule does not exist." });
        }
        
        let decodedJwt = await decodeJwt(req.headers);
        let currentUser = await database.users.findOne({  raw: true , where: {email: decodedJwt.email} })
        if ((Number(currentUser.id) != currentSchedule.userId)){
            return res.status(401).json({ code: "error", message: "Unauthorized to delete." });
        }
        const deleted = await database.schedules.destroy({where: { id: id }});
        if (deleted) {
            return res.status(201).json({ code: "success", message: "Schedule Deleted." });
        }
        
	} catch (err) {
        console.log(err);
        return res.status(500).json({ code: "error", message: "Error with deleting Schedule. Please retry." });
	}
}
module.exports = schedulesController;
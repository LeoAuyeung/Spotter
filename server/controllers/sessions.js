
var database = require('../models');
var usersModel = require('../models/sessions');
var decodeJwt = require('../middleware/decodeJwt');

const sessionsController = {
    getAllSessions: getAllSessions,
    createSession: createSession,
    editSession: editSession,
    deleteSession: deleteSession,

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
        let newSession = req.body;
        let decodedJwt = await decodeJwt(req.headers);

        let currentUser = await database.users.findOne({  raw: true , where: {email: decodedJwt.email} })
        newSession.ownerId = currentUser.id;
        await database.sessions.create(newSession);
        res.status(201).json(newSession);
	} catch (err) {
		console.log(err);
		return res.status(401).json({ code: "error", message: "Error with creating Session. Please retry." });
	}
}

async function editSession(req, res, next) {
	try {
        const { id } = req.params;
        const currentSession = await database.sessions.findOne({  raw: true , where: {id: id} });
        if (currentSession == null){
            return res.status(401).json({ code: "error", message: "Session does not exist." });
        }
        let newSession = req.body;
        
        let decodedJwt = await decodeJwt(req.headers);
        let currentUser = await database.users.findOne({  raw: true , where: {email: decodedJwt.email} })

        if ((Number(currentUser.id) != currentSession.ownerId)){
            return res.status(401).json({ code: "error", message: "Session does not exist." });
        }
        if (req.body.id && (Number(req.body.id) != currentSession.ownerId)){
            return res.status(401).json({ code: "error", message: "Unathorized to edit." });
        }
        const [ updated ] = await database.sessions.update(req.body, {where: { id: id }});
        if (updated) {
            const updatedSessions = await database.sessions.findOne({ where: { id: id } });
            return res.status(200).json({ updatedSessions });
        }
	} catch (err) {
        console.log(err);
        return res.status(401).json({ code: "error", message: "Error with updating Session. Please retry." });
	}
}


async function deleteSession(req, res, next) {
	try {
		var allSessions = await database.sessions.findAll();
		res.status(200).json(allSessions);
	} catch (err) {
		console.log(err);
	}
}
module.exports = sessionsController;
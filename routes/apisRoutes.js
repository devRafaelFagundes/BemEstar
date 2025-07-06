const express = require("express")

const authMiddleware =  require("../middlewares/authMiddleware")
const professionalMiddleware = require("../middlewares/professionalMiddleware")

//--------- meetings
const {createMeeting, getMeetings} = require("../controllers/meetingController")

const apiRouter = express.Router()

apiRouter.get('/meetings', authMiddleware, getMeetings)
apiRouter.post('/create-meeting', authMiddleware, professionalMiddleware, createMeeting)
//delete meeting
//update meeting

//----------clients

const {getClients} = require('../controllers/clientsController')

apiRouter.get('/clients', authMiddleware, professionalMiddleware, getClients)

module.exports = apiRouter;

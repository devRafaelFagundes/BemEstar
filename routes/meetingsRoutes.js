const express = require("express")
const authMiddleware =  require("../middlewares/authMiddleware")
const professionalMiddleware = require("../middlewares/professionalMiddleware")
const {createMeeting, getMeeting} = require("../controllers/meetingController")

const meetingRouter = express.Router()
meetingRouter.get('/meetings', authMiddleware, getMeeting)
meetingRouter.post('/create-meeting', authMiddleware, professionalMiddleware, createMeeting)
//delete meeting
//update meeting

module.exports = meetingRouter;
"use strict";
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const professionalMiddleware = require("../middlewares/professionalMiddleware");
//--------- meetings
const { createMeeting, getMeetings, deleteMeeting } = require("../controllers/meetingController");
const meetingsRouter = express.Router();
meetingsRouter.get('/', authMiddleware, getMeetings);
meetingsRouter.post('/create-meeting', authMiddleware, professionalMiddleware, createMeeting);
//delete meeting
meetingsRouter.delete('/delete/:id', authMiddleware, professionalMiddleware, deleteMeeting);
//update meeting
module.exports = meetingsRouter;
//# sourceMappingURL=meetingsRoutes.js.map
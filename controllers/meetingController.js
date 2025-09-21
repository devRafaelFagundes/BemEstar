const mongoose = require("mongoose")
const Meeting = require("../models/meetingSchema")
const buildFilter = require("../helpers/buildFilter");
const { findByIdAndDelete } = require("../models/userSchema");
//only use with authMiddleware and professionalMiddleware

//get meetings (PUBLIC QUERY)
const getMeetings = async (req, res, next) => {
    try {
        const role = req.userInfo.role;
        const userId = req.userInfo.userId
        const filter = await buildFilter(req.query, role, userId)
        const data = await Meeting.find({
            ...filter
        }).populate({path: "clients", select: "username"}).populate({path: "professional", select: "username"}).sort({
            date: 1
        });
        if(data.length == 0) {
            return res.status(404).json({
                success: false,
                message : 'Nenhuma reunião encontrada'
            })
        
        }
        //update meetings if date expired
        for(meeting of data) {
            if(meeting.date < Date.now()) {
                meeting.done = true;
                await meeting.save()
            }
            else {
                meeting.done = false;
                await meeting.save()
            }
        }
        return res.status(200).json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}
//create meeting
const createMeeting = async (req, res, next) => {
    try {
        const {topic, link, date, done, clients} = req.body;
        const userId = req.userInfo.userId
        //id of the professional user 
        if(!date) {
            const err = new Error("No date informed")
            return next(err)
        }
        if(!clients) {
            const err = new Error("Can not create a meeting operation without any client")
            return next(err)
        }
        const data = new Date(date)
        const newMeeting = await Meeting.create({
            topic,
            link,
            date : data,
            clients,
            professional : userId
        })
        
        res.json({
            success : true,
            message : "Meeting create Successfully"
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
//update meeting
const updateMeeting  = async (req, res, next) => {
    //need to understand the logic behind updating long schemas
    //not really, i can simply use fetch do get all the info and already put in the form
}

const deleteMeeting = async (req, res, next) => {
    try {
        const professionalRequesting = req.userInfo.userId;
        const meetingId = req.params.id
        const matchMeeting = await Meeting.findOne({
            _id: new mongoose.Types.ObjectId(meetingId)
        });
        if(!matchMeeting) {
            const error = new Error('Meeting not found')
            error.statusCode = 404
            return next(error)
        }
        if(!matchMeeting.professional.equals(professionalRequesting)) {
            console.log('Comparando: ', matchMeeting.professional, professionalRequesting)
            const error = new Error('Can not delete meetings not created by you')
            error.statusCode = 400;
            return next(error)
        }
        
        const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);
        res.json({
            success: true,
            message: 'Meeting deleted successfully'
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {createMeeting, getMeetings, deleteMeeting}
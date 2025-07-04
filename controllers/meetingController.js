const mongoose = require("mongoose")
const Meeting = require("../models/meetingSchema")
const buildFilter = require("../helpers/buildFilter")
//only use with authMiddleware and professionalMiddleware

//get meetings (PUBLIC QUERY)
const getMeetings = async (req, res, next) => {
    try {
        const role = req.userInfo.role;
        const userId = req.userInfo.userId
        const filter = await buildFilter(req.query, role, userId)
        const data = await Meeting.find(filter);
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
        const newMeeting = await Meeting.create({
            topic,
            link,
            date,
            done,
            clients,
            professional : userId
        })
        
        res.json({
            success : true,
            message : "Meeting create Successfully"
        })
    } catch (err) {
        next(err)
    }
}
//update meeting
const updateMeeting  = async (req, res, next) => {
    //need to understando the logic behind updating long schemas
}

//delete meeting

module.exports = {createMeeting, getMeetings}
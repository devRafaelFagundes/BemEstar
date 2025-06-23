const mongoose = require('mongoose')
const User = require('./userSchemaa')
const meetingSchema = new mongoose.Schema({
    professional : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clients : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
})
//ref: 'User' so i can use .populate() later

module.exports = mongoose.model('Meeting', meetingSchema);
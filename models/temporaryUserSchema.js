const mongoose = require('mongoose')

const temporaryUser = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    role : {
        type : String,
        enum : ["client", "professional"],
        default : "client"
    },
    isEmailConfirmed : {
        type : Boolean,
        default: false
    },
    random : String
})

module.exports = mongoose.model('temporaryUser', temporaryUser)
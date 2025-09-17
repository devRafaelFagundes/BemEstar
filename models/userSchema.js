const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
    personalInfo : {
            weight : Number,
            height : Number,
            bodyfat : Number,
            goal : String,
            medicalCondition : String
    },
    professional : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    },

    clientes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    }],
    refreshToken : {
        token : String,
        expiresAt : Date
    }
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema);
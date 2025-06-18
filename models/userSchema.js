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

    professional : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    },

    clientes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    }]
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema);
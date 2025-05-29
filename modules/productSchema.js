const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    nome : {
        required : true,
        type : String
    },
    timeToTake : {
        type : Number,
        //probably use seconds/take as measure system, the frontend transforms any hh:mm:ss before sending it to the back end
        required : true
    }
}, {timestamps : true})
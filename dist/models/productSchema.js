"use strict";
const mongoose = require("mongoose");
const User = require("./userSchema");
const productSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String
    },
    timeToTake: {
        type: Number,
        //probably use seconds/take as measure system, the frontend transforms any hh:mm:ss before sending it to the back end
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
//# sourceMappingURL=productSchema.js.map
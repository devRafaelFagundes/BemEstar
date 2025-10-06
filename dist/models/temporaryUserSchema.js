"use strict";
const mongoose = require('mongoose');
const temporaryUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["client", "professional"],
        default: "client"
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false
    },
    random: String,
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     expires: 60 * 60
    // }
}, {
    timestamps: true
});
module.exports = mongoose.model('temporaryUser', temporaryUser);
//# sourceMappingURL=temporaryUserSchema.js.map
"use strict";
require("dotenv").config();
const crypto = require("crypto");
const cron = require('node-cron');
const User = require("../models/userSchema");
const temporaryUser = require('../models/temporaryUserSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const z = require('zod');
const { sendEmail, formEmailMessage } = require('../helpers/sendEmail');
const register = async (req, res, next) => {
    try {
        const username = req.body.username;
        const findTemporaryUser = await temporaryUser.findOne({
            username
        });
        const userMidCreated = await User.findOne({
            username
        });
        if (userMidCreated) {
            const error = new Error('User created while confirmation process was running');
            error.statusCode = 409;
            return next(error);
        }
        if (!findTemporaryUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }
        if (!findTemporaryUser.isEmailConfirmed) {
            const error = new Error('User not validated by email');
            error.statusCode = 401;
            return next(error);
        }
        const newUser = await User.create(req.body);
        await findTemporaryUser.deleteOne();
        return res.json({
            success: true,
            message: 'User created successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
const logIn = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        const logUser = await User.findOne({ username });
        if (!logUser) {
            const err = new Error('User do not exist');
            err.statusCode = 404;
            return next(err);
        }
        const matchPassword = await bcrypt.compare(password, logUser.password);
        if (!matchPassword) {
            const err = new Error('Wrong password');
            err.statusCode = 401;
            return next(err);
        }
        const refreshToken = crypto.randomBytes(64).toString('hex');
        logUser.refreshToken = {
            token: refreshToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            //7 days
        };
        await logUser.save();
        const token = jwt.sign({
            username,
            email,
            userId: logUser._id,
            role: logUser.role
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            //1 week
            path: '/'
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/'
            //7 days
        });
        //cookie created to pass the authMiddleware (check if the user is logged in) automatically
        return res.status(200).json({
            success: true,
            message: 'User logged succesfully'
        });
    }
    catch (error) {
        next(error);
    }
};
const changePassword = async (req, res, next) => {
    //if he is already logged in
    //USE ONLY AFTER THE AUTHMIDDLEWARE
    const { newPassword } = req.body;
    if (!newPassword) {
        const err = new Error('No passowrd given');
        err.statusCode(400);
    }
    const userToChange = await User.findOne({ _id: req.userInfo.userId });
    if (!userToChange) {
        const err = new Error('User not found');
        err.statusCode = 404;
        next(err);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await User.findByIdAndUpdate(req.userInfo.userId, { password: hashedPassword }, { new: true });
};
const logout = async (req, res, next) => {
    res.clearCookie('refreshToken');
    res.clearCookie('token');
    return res.json({
        success: true,
        message: 'Cookies apagados'
    });
};
const generateTemporaryUser = async (req, res, next) => {
    try {
        const { username, password, email, role } = req.body;
        const usernameExists = await User.findOne({ $or: [{ username }, { email }] });
        if (usernameExists) {
            const err = new Error('Username or Email is already taken');
            err.statusCode = 400;
            return next(err);
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const randomString = crypto.randomBytes(32).toString('hex');
        //create user with hashed password
        const newUser = await temporaryUser.create({
            username,
            password: hashedPassword,
            email,
            role,
            random: randomString,
        });
        if (!newUser) {
            const error = new Error('Something went wrong when trying to create the user');
            error.statusCode = 500;
            return next(error);
        }
        //send email
        const htmlMessage = formEmailMessage('Confirm Bem Estar account', 'Click on the link to validate the account', `http://localhost:3000/auth/confirm/${randomString}`);
        const send = await sendEmail(email, htmlMessage, `Confirm Bem Estar account by clicking the link: http://localhost:3000/auth/confirm/${randomString}`);
        if (!send.success) {
            const error = new Error(send.message);
            error.statusCode = 500;
            return next(error);
        }
        return res.json({
            success: true,
            message: 'User generated and email sent successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
const randomStringPassword = z.object({
    random: z.string()
});
const confirmUser = async (req, res, next) => {
    try {
        const randomString = randomStringPassword.parse({ random: req.params.random });
        //put regex validation to prevet query injection
        //confirm if the string exists in the database of temporaryUsers
        if (!findUserByString) {
            const error = new Error('Temporary user not found');
            error.statusCode = 404;
            return next(error);
        }
        findUserByString.isEmailConfirmed = true;
        await findUserByString.save();
        const infoObj = findUserByString.toObject();
        req.body = {
            username: infoObj.username,
            email: infoObj.email,
            role: infoObj.role,
            password: infoObj.password,
        };
        return register(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
//user a lib such as node-cron for cleaning unconfirmed users after a setted time
cron.schedule('0 * * * *', async () => {
    const dateLimit = new Date(Date.now() - (1000 * 60 * 60));
    try {
        const result = await temporaryUser.deleteMany({
            isEmailConfirmed: false,
            createdAt: { $lt: dateLimit }
        });
        console.log('Deleted users', result.deletedCount);
    }
    catch (error) {
        console.log('An error ocurred while trying to delete temporary users');
    }
});
module.exports = { register, logIn, changePassword, logout, confirmUser, generateTemporaryUser };
//# sourceMappingURL=authController.js.map
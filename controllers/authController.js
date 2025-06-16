require("dotenv").config()
const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async (req, res, next) => {
    try {
        const {username, password, email} = req.body;
        
        //check if the user already exists
        const usernameExists = await User.findOne({$or : [{username}, {email}]});
        if (usernameExists) {        
            const err = new Error('user already exists');
            err.statusCode = 400;
            return next(err);
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user with hashed password
    const newUser = await User.create({
        username,
        password: hashedPassword,
        email
    })

    if(newUser) {
        return res.status(200).json({
            success : true,
            message : 'User created succesfully'
        })
    }
    } catch (error) {
        next(error);
    }
}

const logIn = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const logUser = await User.findOne({$or : [{username}, {email}]})
        if(!logUser) {
            const err = new Error('User do not exist');
            err.statusCode = 404;
            return next(err)
        }
        const matchPassword = await bcrypt.compare(password, logUser.password)
        if (!matchPassword) {
            const err = new Error('Wrong password');
            err.statusCode = 401;
            return next(err)
        }

        const token = jwt.sign({
            username,
            email,
            userId : logUser._id
        }, process.env.JWT_SECRET, {
            expiresIn : '30m'
        })
        res.cookie('token', token, {
            httpOnly : true,
            secure : true,
            maxAge : 30 * 60 * 1000
            //30 minutes
        })
        //cookie created to pass the authMiddleware (check if the user is logged in) automatically
        return res.status(200).json({
            success : true,
            message : 'User logged succesfully'
        })
    } catch (error) {
        next(error);
    }
}
const changePassword = async (req, res, next) => {
    //if he is already logged in
    //USE ONLY AFTER THE AUTHMIDDLEWARE
    const {newPassword} = req.body;
    if (!newPassword) {
        const err = new Error('No passowrd given');
        err.statusCode(400)
    }
    const userToChange = await User.findOne({_id: req.userInfo.userId})
    if(!userToChange) {
        const err = new Error('User not found');
        err.statusCode = 404;
        next(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
        req.userInfo.userId,
        {password : hashedPassword},
        {new : true}
    ) 
}
module.exports = {register, logIn, changePassword}
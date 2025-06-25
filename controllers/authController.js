require("dotenv").config()
const crypto = require("crypto")
const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async (req, res, next) => {
    try {
        const {username, password, email, role} = req.body;  
        console.log(role)      
        //check if the user already exists
        const usernameExists = await User.findOne({$or : [{username}, {email}]});
        if (usernameExists) {        
            const err = new Error('Username or Email is already taken');
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
        email,
        role
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
        console.log(req.body)
        const logUser = await User.findOne({username})
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
        
        const refreshToken = crypto.randomBytes(64).toString('hex');

        logUser.refreshToken = {
            token : refreshToken,
            expiresAt : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            //7 days
        };
        await logUser.save()

        const token = jwt.sign({
            username,
            email,
            userId : logUser._id,
            role: logUser.role
        }, process.env.JWT_SECRET, {
            expiresIn : '15m'
        })
        res.cookie('token', token, {
            httpOnly : true,
            secure : true,
            sameSite: 'Strict',
            maxAge :  15 * 60 * 1000
            //15 minutes
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            secure : true,
            sameSite: 'Strict',
            maxAge :  1000 * 60 * 60 * 24 * 7
            //7 days
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
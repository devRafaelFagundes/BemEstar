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
            message : "user created successfully"
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
            email
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
            sucess : true,
            message : 'User logged in successfully',
            token
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {register, logIn}
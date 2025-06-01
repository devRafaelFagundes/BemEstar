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
            err.statusCode(400);
            return next(err);
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

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
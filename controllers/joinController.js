const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/userSchema")
//only professionals can use this route

const joinFunction = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const idProfissional = req.userInfo.userId;

        if(!username || !password) {
            const err = new Error("Faltando informações")
            err.statusCode = 400;
            return next(err)
        }
        if(typeof(username) !== 'string' || !Array.isArray(username)) {
            const err = new Error("Formato inválido")
            err.statusCode = 401;
            return next(err)
        }
        const user = await User.findOne({
            username
        })
        
        if(!user) {
            const err = new Error("User not found")
            err.statusCode = 404
            return next(err)
        }
        if(user.professional) {
            const err = new Error("Já possui um profissional")
            err.statusCode = 401;
            return next(err)
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword) {
            const err = new Error("Invalid Password")
            err.statusCode = 401;
            return next(err)
        }
        user.professional = idProfissional;
        await user.save()
    } catch (error) {
        next(error)    
    }
}
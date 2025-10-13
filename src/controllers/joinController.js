const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/userSchema.ts")
//only professionals can use this route

const joinFunction = async (req, res, next) => {
    try {
        const username  = req.body.username?.trim();
        const password = req.body.password

        const idProfissional = req.userInfo.userId;
        console.log(username, password)
        if(!username || !password) {
            const err = new Error("Faltando informações")
            err.statusCode = 400;
            return next(err)
        }
        if(typeof(username) !== 'string') {
            const err = new Error("Formato inválido")
            err.statusCode = 401;
            return next(err)
        }
        const user = await User.findOne({
            username
        })
        const testing = await User.find();
        console.log(testing)
        if(!user) {
            const err = new Error("User not found")
            err.statusCode = 404
            return next(err)
        }
        if(user.role === 'professional') {
            const err = new Error('Usuário não pode ser adicionado pois é um profissional')
            err.statusCode = 401;
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
        
        const professional = await User.findById(idProfissional);
        if(!professional) {
            const err = new Error('You dont even exists in the database, how is that possible?')
            err.statusCode = 401
            return next(err)
        }
        
        professional.clientes.push(user._id);
        await professional.save()
        
        return res.status(200).json({
            success : true,
            message : 'Usuário ingressado com sucesso'
        })
    } catch (error) {
        next(error)    
    }
}

module.exports = joinFunction;
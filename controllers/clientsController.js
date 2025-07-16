const User = require("../models/userSchema")
const mongoose = require("mongoose")

const getClients = async (req, res, next) => {
    
    //will create a filter function later for this part
    try {
        const idProfissional = new mongoose.Types.ObjectId(req.userInfo.userId) 
        const clients = await User.aggregate([
            {
                $match : {
                    professional : idProfissional
                }
            },
            {
                $project : {
                    "username" : 1
                }
            }
        ])
        
        if(!clients || clients.length === 0) {
            const error = new Error('Sem clientes por enquanto')
            error.statusCode  =  404;
            return next(error)
        }

        return res.status(200).json({
            success : true,
            message : clients
        })

    } catch (error) {
        next(error)
    }
}

const clientsPersonal = async (req, res, next) => {
    try {
        const TrueUserId = req.userInfo.userId;
        const userRole = req.userInfo.role;

        //well, i need to access this information searching in the database
        
        const userId = new mongoose.Types.ObjectId(req.params.id);

        if(userRole === 'professional') {
            const professional = await User.findById(TrueUserId);
            console.log(professional.clientes)
            if(!professional.clientes.includes(userId.toString())) {
                return res.status(400).json({
                    success : false,
                    message : 'Não pode acessar esse usuário'
                })
            }
        }
        if(userRole === 'client') {
            if(userId.toString() !== TrueUserId.toString()) {
                return res.status(400).json({
                    success : false,
                    message : 'Não pode acessar informações pessoais de outro usuário'
                })
            }
        }       
        const user = await User.aggregate([
            {
                $match : {
                    _id : userId
                }
            },
            {
                $project : {
                    "username": 1,
                    "personalInfo": 1
                }
            }
        ])
        if(!user || user.length === 0) {
            const err = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }
        return res.status(200).json({
            success : true,
            message : user
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {getClients, clientsPersonal}
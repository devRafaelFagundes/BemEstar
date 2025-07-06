const User = require("../models/userSchema")
const mongoose = require("mongoose")

const getClients = async (req, res, next) => {
    
    //will create a filter function later for this part
    try {
        const idProfissional = req.userInfo.userId;
        const clients = await User.find({
            professional : idProfissional
        })
        
        if(!clients) {
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

module.exports = {getClients}
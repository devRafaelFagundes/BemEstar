import type { Request, Response, NextFunction} from "express"
import type {}from "mongoose"
import type {CustomError} from "../types/error"
import type {AuthRequest} from "../types/user"
import zod = require("zod")
const User = require("../models/userSchema")
const userService = require('../services/userServices')

const mongoose = require("mongoose")

const getClients = async (req: AuthRequest, res: Response, next: NextFunction) => {
    
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
            const error: CustomError = new Error('Sem clientes por enquanto')
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

const clientsPersonal = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const passedUserId = req.params.id
        const userId = req.userInfo.userId;
        const userRole = req.userInfo.role;
        

        if(userRole === 'professional') {
            if(!passedUserId) {
                const error: CustomError = new Error('Need to inform the user Id')
                error.statusCode = 400
                return next(error)
            }

            const userToGetInfo = await User.aggregate([
                {
                    $match : {
                        _id: new mongoose.Types.ObjectId(passedUserId)
                    }
                },
                {
                    $project : {
                        "username" : 1,
                        "personalInfo": 1,
                        "email": 1
                    }
                }
            ])

            if(!userToGetInfo || userToGetInfo.length === 0) {
                const error: CustomError = new Error('User not found')
                error.statusCode = 404
                return next(error)
            }
            const professional = await User.findById(userId)
            if(!professional.clientes.some((id: any) => id.toString() === passedUserId)) {
                const error: CustomError= new Error('Can not access user not afilliated')
                error.statusCode = 400
                return next(error)
            }

            return res.json({
                success: true,
                message: userToGetInfo[0]
            })
        }
        
        const user = await User.aggregate([
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $project : {
                    "username": 1,
                    "email": 1,
                    "personalInfo": 1,
                }
            }
        ])
        if(!user || user.length === 0) {
            const err: CustomError = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }
        return res.status(200).json({
            success : true,
            message : user[0]
        })
    } catch (error) {
        next(error)
    }
}
class UserController {
    async updatePersonal(req: AuthRequest, res: Response, next: NextFunction){
        try {
            const userId = req.userInfo.userId
            const data = req.body
            const result = await userService.updatePersonalInfo(userId, data)
            return res.status(200).json(result)
        } catch (error: any) {
            return next(error)
        }
    }
}
// const updatePersonal = async (req, res, next) => {
//     try {
//         const allowedFields = ["weight", "bodyfat", "goal", "height", "medicalCondition"]
//         let changes = {}
//         for(field of allowedFields) {
//             if(req.body[field] !== undefined) {
//                 changes[field] = req.body[field]
//             }
//         }
//         const userChanging = await User.findById(req.userInfo.userId);
//         Object.assign(userChanging.personalInfo, changes)
//         await userChanging.save()
//         return res.json({
//             success : true,
//             message: 'Client updated successfully'
//         })
//     } catch (error) {
//         return next(error)
//     }
// }

const userController = new UserController()
module.exports = {getClients, clientsPersonal, userController}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User = require("../models/userSchema");
const { UserService } = require('../services/userServices');
const mongoose = require("mongoose");
const getClients = async (req, res, next) => {
    //will create a filter function later for this part
    try {
        const idProfissional = new mongoose.Types.ObjectId(req.userInfo.userId);
        const clients = await User.aggregate([
            {
                $match: {
                    professional: idProfissional
                }
            },
            {
                $project: {
                    "username": 1
                }
            }
        ]);
        if (!clients || clients.length === 0) {
            const error = new Error('Sem clientes por enquanto');
            error.statusCode = 404;
            return next(error);
        }
        return res.status(200).json({
            success: true,
            message: clients
        });
    }
    catch (error) {
        next(error);
    }
};
const clientsPersonal = async (req, res, next) => {
    try {
        const passedUserId = req.params.id;
        const userId = req.userInfo.userId;
        const userRole = req.userInfo.role;
        if (userRole === 'professional') {
            if (!passedUserId) {
                const error = new Error('Need to inform the user Id');
                error.statusCode = 400;
                return next(error);
            }
            const userToGetInfo = await User.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(passedUserId)
                    }
                },
                {
                    $project: {
                        "username": 1,
                        "personalInfo": 1,
                        "email": 1
                    }
                }
            ]);
            if (!userToGetInfo || userToGetInfo.length === 0) {
                const error = new Error('User not found');
                error.statusCode = 404;
                return next(error);
            }
            const professional = await User.findById(userId);
            if (!professional.clientes.some((id) => id.toString() === passedUserId)) {
                const error = new Error('Can not access user not afilliated');
                error.statusCode = 400;
                return next(error);
            }
            return res.json({
                success: true,
                message: userToGetInfo[0]
            });
        }
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $project: {
                    "username": 1,
                    "email": 1,
                    "personalInfo": 1,
                }
            }
        ]);
        if (!user || user.length === 0) {
            const err = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }
        return res.status(200).json({
            success: true,
            message: user[0]
        });
    }
    catch (error) {
        next(error);
    }
};
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async updatePersonal(req, res, next) {
        try {
            const result = await this.userService.updatePersonalInfo(req.userInfo.userId, req.body);
            return res.status(200).json({ success: true, message: "User updated successfully" });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.UserController = UserController;
const userController = new UserController(UserService);
module.exports = { getClients, clientsPersonal, userController };
//# sourceMappingURL=clientsController.js.map
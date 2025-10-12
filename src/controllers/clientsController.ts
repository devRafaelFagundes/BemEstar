import type { Request, Response, NextFunction} from "express"
import type {} from "mongoose"
import type {CustomError} from "../types/error"
import type {AuthRequest} from "../types/user"
import zod = require("zod")
const User = require("../models/userSchema")
import {ClientsServices} from "../services/clientsServices"

const mongoose = require("mongoose")

export class ClientsController {
    protected userService: any
    constructor(userService:any) {
        this.userService = userService
    }
    async updatePersonal(req: AuthRequest, res: Response, next: NextFunction){
        try {
            const result = await this.userService.updatePersonalInfo(req.userInfo.userId, req.body)
            return res.status(200).json({success: true, message: "User updated successfully", data: result})
        } catch (error) {
            return next(error)
        }
    }
    async getClients(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const info = await this.userService.getClients(req.userInfo.userId, req.userInfo.role, req.query?.specificClientId)
            return res.status(200).json({
                success: true,
                message: "Got information successfully",
                data: info
            })
        } catch (error) {
            return next(error)
        }
    }
}


const clientService = new ClientsServices()
const clientController = new ClientsController(clientService)
module.exports = {clientController}
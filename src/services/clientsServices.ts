import { CustomError } from "../types/error"
import type {PersonalInfo, UserInfo} from "../types/user"
const User = require('../models/userSchema')
const z = require('zod')
const mongoose = require('mongoose')

const personalInfoSchema = z.object({
    weight: z.number().optional(),
    bodyfat: z.number().optional(),
    goal: z.string().optional(),
    height: z.number().optional(),
    medicalCondition: z.string().optional()
})

export class ValidateClientInput {
    infoObject: Partial<PersonalInfo>
    constructor(infoObject: Partial<PersonalInfo>) {
        this.infoObject = infoObject
    }
    validate() {
        return personalInfoSchema.parse(this.infoObject)
    }
}

export class ClientsServices {
    async updatePersonalInfo(userId: string, data: Partial<PersonalInfo>, role: 'professional' | 'client') {
        // const parsedData = personalInfoSchema.parse(data)
        if(role === 'professional') {
            const error: CustomError = new Error('Professionals have no access to personal info')
            error.statusCode = 403
            throw error
        } 
        const validateController = new ValidateClientInput(data)
        const parsedData = validateController.validate()
        const user = await User.findById(userId)
        if(!user) {
            const error: CustomError = new Error('User not found')
            error.statusCode = 404
            throw error
        }

        user.personalInfo = {...user.personalInfo, ...parsedData}
        await user.save()
        return user;
    }
    async getClients(personalUserId: string, role: 'professional' | 'client', specificClientId?: string) {
        const mongoosePersonalId = new mongoose.Types.ObjectId(personalUserId)
        if(role === 'client') {
            const user = await User.findById(mongoosePersonalId)
            if(!user) {
                const error: CustomError = new Error('You were not found, but its logged?')
                error.statusCode = 403
                throw error
            }
            return user
        }
        if(specificClientId) {
            const user = await User.findById(specificClientId).select({username: 1, personalInfo: 1, email: 1})
            if (!user) {
                const error: CustomError = new Error('User not found')
                error.statusCode = 404
                throw error
            }
            if(!user.professional.equals(mongoosePersonalId)) {
                const error: CustomError = new Error('You do not have access to this user info')
                error.statusCode = 403
                throw error
            }
            return user
        }

        //this part means that a professional is requesting all the users in their controll
        const requestingProfessional = await User.findById(mongoosePersonalId)
        const users: string[] = requestingProfessional.users
        if(!users || users.length === 0) {
            const error: CustomError = new Error('No users found')
            error.statusCode = 404
            throw error
        }
        return users
    }
}

//next steps, separate all the queries (db) in classes, after all, we need to test it with jest
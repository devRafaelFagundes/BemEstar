"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema = require("../models/userSchema");
const User = require('../models/userSchema');
const z = require('zod');
const personalInfoSchema = z.object({
    weight: z.number().optional(),
    bodyfat: z.number().optional(),
    goal: z.string().optional(),
    height: z.number().optional(),
    medicalCondition: z.string().optional()
});
class UserService {
    async updatePersonalInfo(userId, data) {
        const parsedData = personalInfoSchema.parse(data);
        const user = await userSchema.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.personalInfo = { ...user.personalInfo, ...parsedData };
        await user.save();
        return {
            success: true,
            message: "Personal Info updated successfully"
        };
    }
}
const userService = new UserService();
module.exports = userService;
//# sourceMappingURL=userServices.js.map
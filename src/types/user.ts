import type {Request} from "express"
export interface PersonalInfo {
    weight: number,
    bodyfat: number,
    goal: string,
    height: number,
    medicalCondition: string
}

export interface UserInfo {
  username: string;
  email: string;
  role: string;
  personalInfo: PersonalInfo;
}

export interface AuthRequest extends Request{
    userInfo: {
        username: string,
        email: string,
        userId : string,
        role: "professional" | "client"
    }
    params: any
}
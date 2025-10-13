import mongoose, {Schema, Types, Document, model } from "mongoose";

// const userSchema = new mongoose.Schema({
//     username : {
//         type : String,
//         required: true,
//         unique : true,
//         trim : true
//     },
//     password : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : String,
//         required : true,
//         unique : true,
//         trim : true
//     },
//     role : {
//         type : String,
//         enum : ["client", "professional"],
//         default : "client"
//     },
//     personalInfo : {
//             weight : Number,
//             height : Number,
//             bodyfat : Number,
//             goal : String,
//             medicalCondition : String
//     },
//     professional : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'User',
//         default : null
//     },

//     clientes : [{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'User',
//         default : null
//     }],
//     refreshToken : {
//         token : String,
//         expiresAt : Date
//     }
// }, {timestamps : true})


type IUser = {
    username: string,
    password: string,
    email: string,
    role: string,
    professional: Types.ObjectId,
    clientes: Types.ObjectId[],
    refreshToken: string,
    personalInfo? : {
        weight?: number,
        height?: number,
        bodyfat?: number,
        goal?: string,
        medicalCondition?: string
    },
    createdAt?: Date,
    updatedAt?: Date
}

type IUserDocument = IUser & Document 
const userSchema = new Schema<IUserDocument>(
    {
    username : {
        type : String,
        required: true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    role : {
        type : String,
        enum : ["client", "professional"],
        default : "client"
    },
    personalInfo : {
            weight : Number,
            height : Number,
            bodyfat : Number,
            goal : String,
            medicalCondition : String
    },
    professional : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        default : null
    },

    clientes : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        default : null
    }],
    refreshToken : {
        token : String,
        expiresAt : Date
    }
}, {timestamps : true})
model
export const User = model<IUserDocument>("User", userSchema)
// module.exports = mongoose.model('User', userSchema);

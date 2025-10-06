declare const _exports: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    professional: mongoose.Types.ObjectId;
    clientes: mongoose.Types.ObjectId[];
    personalInfo?: {
        weight?: number | null;
        height?: number | null;
        bodyfat?: number | null;
        goal?: string | null;
        medicalCondition?: string | null;
    } | null;
    refreshToken?: {
        token?: string | null;
        expiresAt?: NativeDate | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    professional: mongoose.Types.ObjectId;
    clientes: mongoose.Types.ObjectId[];
    personalInfo?: {
        weight?: number | null;
        height?: number | null;
        bodyfat?: number | null;
        goal?: string | null;
        medicalCondition?: string | null;
    } | null;
    refreshToken?: {
        token?: string | null;
        expiresAt?: NativeDate | null;
    } | null;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    professional: mongoose.Types.ObjectId;
    clientes: mongoose.Types.ObjectId[];
    personalInfo?: {
        weight?: number | null;
        height?: number | null;
        bodyfat?: number | null;
        goal?: string | null;
        medicalCondition?: string | null;
    } | null;
    refreshToken?: {
        token?: string | null;
        expiresAt?: NativeDate | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    professional: mongoose.Types.ObjectId;
    clientes: mongoose.Types.ObjectId[];
    personalInfo?: {
        weight?: number | null;
        height?: number | null;
        bodyfat?: number | null;
        goal?: string | null;
        medicalCondition?: string | null;
    } | null;
    refreshToken?: {
        token?: string | null;
        expiresAt?: NativeDate | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    professional: mongoose.Types.ObjectId;
    clientes: mongoose.Types.ObjectId[];
    personalInfo?: {
        weight?: number | null;
        height?: number | null;
        bodyfat?: number | null;
        goal?: string | null;
        medicalCondition?: string | null;
    } | null;
    refreshToken?: {
        token?: string | null;
        expiresAt?: NativeDate | null;
    } | null;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    professional: mongoose.Types.ObjectId;
    clientes: mongoose.Types.ObjectId[];
    personalInfo?: {
        weight?: number | null;
        height?: number | null;
        bodyfat?: number | null;
        goal?: string | null;
        medicalCondition?: string | null;
    } | null;
    refreshToken?: {
        token?: string | null;
        expiresAt?: NativeDate | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export = _exports;
import mongoose = require("mongoose");
//# sourceMappingURL=userSchema.d.ts.map
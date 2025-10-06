declare const _exports: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    isEmailConfirmed: boolean;
    random?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    isEmailConfirmed: boolean;
    random?: string | null;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    isEmailConfirmed: boolean;
    random?: string | null;
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
    isEmailConfirmed: boolean;
    random?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    isEmailConfirmed: boolean;
    random?: string | null;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    role: "client" | "professional";
    isEmailConfirmed: boolean;
    random?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export = _exports;
import mongoose = require("mongoose");
//# sourceMappingURL=temporaryUserSchema.d.ts.map
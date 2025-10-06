declare const _exports: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    professional: mongoose.Types.ObjectId;
    done: boolean;
    clients: mongoose.Types.ObjectId[];
    link?: string | null;
    topic?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    professional: mongoose.Types.ObjectId;
    done: boolean;
    clients: mongoose.Types.ObjectId[];
    link?: string | null;
    topic?: string | null;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    professional: mongoose.Types.ObjectId;
    done: boolean;
    clients: mongoose.Types.ObjectId[];
    link?: string | null;
    topic?: string | null;
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
    date: NativeDate;
    professional: mongoose.Types.ObjectId;
    done: boolean;
    clients: mongoose.Types.ObjectId[];
    link?: string | null;
    topic?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    professional: mongoose.Types.ObjectId;
    done: boolean;
    clients: mongoose.Types.ObjectId[];
    link?: string | null;
    topic?: string | null;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    professional: mongoose.Types.ObjectId;
    done: boolean;
    clients: mongoose.Types.ObjectId[];
    link?: string | null;
    topic?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export = _exports;
import mongoose = require("mongoose");
//# sourceMappingURL=meetingSchema.d.ts.map
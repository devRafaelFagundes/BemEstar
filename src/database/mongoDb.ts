import { Model, Document, model, FilterQuery, DeleteResult } from "mongoose";
import { IDatabase } from "../types/db";
export default class MongoDb<T extends Document> implements IDatabase<T>{
    private model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }
    async find(data: FilterQuery<T>): Promise<T[]> {
        return await this.model.find(data).exec()
    }
    async findById(id: string): Promise<T | null> {
        const user = await this.model.findById(id).exec()
        if (user) return user;
        return null
    }
    async findOne(data: FilterQuery<T>): Promise<T | null> {
        const user =  await this.model.findOne(data).exec()
        if(user) return user;
        return null
    }
    async deleteById(id: string): Promise<T | null> {
        const deletedUser = await this.model.findByIdAndDelete(id)
        if(deletedUser) return deletedUser;
        return null
    }
    async deleteMany(data: FilterQuery<T>): Promise<DeleteResult| null> {
        const deletedUsers = await this.model.deleteMany(data).exec()
        if(deletedUsers) return deletedUsers;
        return null
    }
    async findByIdAndUpdate(data: Partial<T>, id: string): Promise<T | null> {
        const updatedUser = await this.model.findByIdAndUpdate(id, data, {new: true}).exec()
        if(updatedUser) return updatedUser;
        return null;
    }
}
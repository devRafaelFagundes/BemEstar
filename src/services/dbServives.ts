import { IDatabase } from "../types/db"
import { CustomError } from "../types/error"
export default class DBCommands<T> {
    database: IDatabase<T>
    constructor(database: IDatabase<T>) {
        this.database = database
    }
    async find(data: Partial<T>) {
        return await this.database.find(data)
    }
    async findOne(data: Partial<T>) {
        return await this.database.findOne(data)
        
    }
    async findById(id: string) {
        return await this.database.findById(id)
    }
    async updateById(id: string, newData: Partial<T>) {
        const user = await this.database.findByIdAndUpdate(newData, id)
        if(!user) {
            const error: CustomError = new Error('Can not find user')
            error.statusCode = 404
            throw error
        }
    }
    async deleteById(id: string) {
        return await this.database.deleteById(id)
    }
}
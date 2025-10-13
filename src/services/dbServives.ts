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
    async save(data: T) {
        return await this.database.save(data)
    }
    async updateById(id: string, newData: Partial<T>) {
        const user = await this.findById(id)
        if(!user) {
            const error: CustomError = new Error('Can not find user')
            error.statusCode = 404
            throw error
        } 
        Object.assign(user, newData)
        await this.database.save(user)
        return user
    }
    async deleteById(id: string) {
        return await this.database.deleteById(id)
    }
}
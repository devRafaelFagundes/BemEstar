import { DeleteResult } from "mongoose"

export type IDatabase<T> =  {
    find(data: Partial<T>): Promise<T[]>
    findOne(data: Partial<T>): Promise<T | null>
    findById(id: string): Promise<T | null>
    deleteById(id: string): Promise<T | null>
    deleteMany(data: Partial<T>): Promise<DeleteResult | null>
    findByIdAndUpdate(data: Partial<T>, id: string): Promise<T | null>
}
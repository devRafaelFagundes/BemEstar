export type IDatabase<T> =  {
    find(data: Partial<T>): Promise<T[]>
    findOne(data: Partial<T>): Promise<T | null>
    findById(id: string): Promise<T | null>
    save(obj: T): Promise<null>
    deleteById<T>(id: string): Promise<T |void>
    deleteMany<T>(data: Partial<T>): Promise<T[] | void | null>
}
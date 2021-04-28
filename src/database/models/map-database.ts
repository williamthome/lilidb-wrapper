import type {
  IDatabaseConnection,
  IDatabaseDeleteOne,
  IDatabaseGetAll,
  IDatabaseGetMany,
  IDatabaseGetOne,
  IDatabaseInsertOne,
  IDatabaseTransaction,
  IDatabaseUpdateOne,
} from '../protocols'

export class MapDatabase
  implements
    IDatabaseConnection,
    IDatabaseTransaction,
    IDatabaseInsertOne,
    IDatabaseGetOne,
    IDatabaseGetMany,
    IDatabaseGetAll,
    IDatabaseUpdateOne,
    IDatabaseDeleteOne {
  private _data: Map<string, unknown[]> = new Map()
  private _snapshot: Map<string, unknown[]> = new Map()
  private _isConnected = false
  private _inTransaction = false

  get isConnected(): boolean {
    return this._isConnected
  }

  get inTransaction(): boolean {
    return this._inTransaction
  }

  async connect(): Promise<void> {
    if (this.isConnected) throw new Error('Is connected')
    this._isConnected = true
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) throw new Error('Is not connected')
    this._isConnected = false
  }

  async startTransaction(): Promise<void> {
    if (this.inTransaction) throw new Error('In transaction')
    this._snapshot = new Map(this._data)
    this._inTransaction = true
  }

  async commitTransaction(): Promise<void> {
    if (!this.inTransaction) throw new Error('Not in transaction')
    this._inTransaction = false
  }

  async rollback(): Promise<void> {
    if (!this.inTransaction) throw new Error('Not in transaction')
    this._data = new Map(this._snapshot)
    this._inTransaction = false
  }

  async insertOne<T>(collectionName: string, obj: T): Promise<T | null> {
    const collection = this._data.get(collectionName)
    this._data.set(collectionName, [...(collection ?? []), obj])
    return obj
  }

  async getOne<T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ): Promise<T | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const found = collection[index]

    return found as T
  }

  async getMany<T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ): Promise<T[] | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const found = collection.filter(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )

    return found as T[]
  }

  async getAll<T>(collectionName: string): Promise<T[] | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    return collection as T[]
  }

  async updateOne<T>(
    collectionName: string,
    by: string,
    matching: unknown,
    as: unknown,
  ): Promise<T | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const found = collection[index]
    const updated = Object.assign(found, as)

    collection[index] = updated

    this._data.set(collectionName, collection)

    return updated as T
  }

  async deleteOne<T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ): Promise<T | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const deleted = collection[index]

    collection.splice(index, 1)
    this._data.set(collectionName, collection)

    return deleted as T
  }
}

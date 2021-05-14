import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionUpdateTypeByName,
} from '@/types'
import type {
  IDatabaseConnection,
  IDatabaseDeleteOne,
  IDatabaseGetAll,
  IDatabaseGetMany,
  IDatabaseGetOne,
  IDatabaseInsertMany,
  IDatabaseInsertOne,
  IDatabaseTransaction,
  IDatabaseUpdateOne,
} from '@/protocols'

export class MapDbWrapper<TCollection extends Collections<unknown>>
  implements
    IDatabaseConnection,
    IDatabaseTransaction,
    IDatabaseInsertOne<TCollection>,
    IDatabaseInsertMany<TCollection>,
    IDatabaseGetOne<TCollection>,
    IDatabaseGetMany<TCollection>,
    IDatabaseGetAll<TCollection>,
    IDatabaseUpdateOne<TCollection>,
    IDatabaseDeleteOne<TCollection> {
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
    this._isConnected = true
  }

  async disconnect(): Promise<void> {
    this._isConnected = false
  }

  async startTransaction(): Promise<void> {
    this._snapshot = new Map(this._data)
    this._inTransaction = true
  }

  async commitTransaction(): Promise<void> {
    this._inTransaction = false
  }

  async rollback(): Promise<void> {
    this._data = new Map(this._snapshot)
    this._inTransaction = false
  }

  async insertOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    obj: TExpected,
  ): Promise<TExpected | null> {
    const collection = this._data.get(collectionName)
    this._data.set(collectionName, [...(collection ?? []), obj])
    return obj
  }

  async insertMany<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    ...objs: TExpected[]
  ): Promise<TExpected[] | null> {
    const collection = this._data.get(collectionName)
    this._data.set(collectionName, [...(collection ?? []), ...objs])
    return objs
  }

  async getOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const found = collection[index]

    return found as TExpected
  }

  async getMany<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected[] | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const found = collection.filter(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )

    return found as TExpected[]
  }

  async getAll<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(collectionName: TCollectionName): Promise<TExpected[] | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    return collection as TExpected[]
  }

  async updateOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>,
    TForUpdate extends ExtractCollectionUpdateTypeByName<
      TCollection,
      TCollectionName
    >
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
    as: TForUpdate,
  ): Promise<TExpected | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const found = collection[index]
    const updated = Object.assign({}, found, as)

    collection[index] = updated

    this._data.set(collectionName, collection)

    return updated as TExpected
  }

  async deleteOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected | null> {
    const collection = this._data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const deleted = collection[index]

    collection.splice(index, 1)
    this._data.set(collectionName, collection)

    return deleted as TExpected
  }
}

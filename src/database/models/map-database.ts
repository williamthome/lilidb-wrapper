import type {
  IDatabaseDeleteOne,
  IDatabaseGetAll,
  IDatabaseGetMany,
  IDatabaseGetOne,
  IDatabaseInsertOne,
  IDatabaseUpdateOne,
} from '../protocols'

export class MapDatabase
  implements
    IDatabaseInsertOne,
    IDatabaseGetOne,
    IDatabaseGetMany,
    IDatabaseGetAll,
    IDatabaseUpdateOne,
    IDatabaseDeleteOne {
  readonly data: Map<string, unknown[]> = new Map()

  async insertOne<T>(collectionName: string, obj: T): Promise<T> {
    const collection = this.data.get(collectionName)
    this.data.set(collectionName, [...(collection ?? []), obj])
    return obj
  }

  async getOne<T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ): Promise<T | null> {
    const collection = this.data.get(collectionName)
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
    const collection = this.data.get(collectionName)
    if (!collection) return null

    const found = collection.filter(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )

    return found as T[]
  }

  async getAll<T>(collectionName: string): Promise<T[] | null> {
    const collection = this.data.get(collectionName)
    if (!collection) return null

    return collection as T[]
  }

  async updateOne<T>(
    collectionName: string,
    by: string,
    matching: unknown,
    as: unknown,
  ): Promise<T | null> {
    const collection = this.data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const found = collection[index]
    const updated = Object.assign(found, as)

    collection[index] = updated

    this.data.set(collectionName, collection)

    return updated as T
  }

  async deleteOne<T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ): Promise<T | null> {
    const collection = this.data.get(collectionName)
    if (!collection) return null

    const index = collection.findIndex(
      (o) => Object.getOwnPropertyDescriptor(o, by)?.value === matching,
    )
    if (index === -1) return null

    const deleted = collection[index]

    collection.splice(index, 1)
    this.data.set(collectionName, collection)

    return deleted as T
  }
}

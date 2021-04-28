export interface IDatabaseInsertOne {
  insertOne: <T>(collectionName: string, obj: T) => Promise<T | null>
}

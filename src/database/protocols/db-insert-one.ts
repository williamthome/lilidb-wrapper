export interface DbInsertOne {
  insertOne: <T>(collectionName: string, obj: T) => Promise<T>
}

export interface DbGetAll {
  getAll: <T>(collectionName: string) => Promise<T[] | null>
}

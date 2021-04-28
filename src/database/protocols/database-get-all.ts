export interface IDatabaseGetAll {
  getAll: <T>(collectionName: string) => Promise<T[] | null>
}

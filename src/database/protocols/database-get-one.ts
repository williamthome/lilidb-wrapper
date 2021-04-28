export interface IDatabaseGetOne {
  getOne: <T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ) => Promise<T | null>
}
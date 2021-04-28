export interface DbGetOne {
  getOne: <T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ) => Promise<T | null>
}

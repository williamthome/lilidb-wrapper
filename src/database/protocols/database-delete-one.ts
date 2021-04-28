export interface IDatabaseDeleteOne {
  deleteOne: <T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ) => Promise<T | null>
}

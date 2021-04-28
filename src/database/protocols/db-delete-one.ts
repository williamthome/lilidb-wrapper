export interface DbDeleteOne {
  deleteOne: <T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ) => Promise<T | null>
}

export interface IDatabaseGetMany {
  getMany: <T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ) => Promise<T[] | null>
}

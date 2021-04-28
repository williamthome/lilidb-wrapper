export interface DbGetMany {
  getMany: <T>(
    collectionName: string,
    by: string,
    matching: unknown,
  ) => Promise<T[] | null>
}

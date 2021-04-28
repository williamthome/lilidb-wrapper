export interface IDatabaseUpdateOne {
  updateOne: <T>(
    collectionName: string,
    by: string,
    matching: unknown,
    as: unknown,
  ) => Promise<T | null>
}

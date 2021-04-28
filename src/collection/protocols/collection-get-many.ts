import type { IDatabaseGetMany } from '@/database/protocols'

export interface ICollectionGetMany {
  getMany: <Expected>(
    collectionName: string,
    db: IDatabaseGetMany,
    by: string,
    matching: unknown,
  ) => Promise<Expected[] | null>
}

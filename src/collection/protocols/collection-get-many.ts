import type { DbGetMany } from '@/database/protocols'

export interface ICollectionGetMany {
  getMany: <Expected>(
    collectionName: string,
    db: DbGetMany,
    by: string,
    matching: unknown,
  ) => Promise<Expected[] | null>
}

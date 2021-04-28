import type { DbGetOne } from '@/database/protocols'

export interface ICollectionGetOne {
  getOne: <Expected>(
    collectionName: string,
    db: DbGetOne,
    by: string,
    matching: unknown,
  ) => Promise<Expected | null>
}

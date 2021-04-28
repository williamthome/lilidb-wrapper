import type { DbGetAll } from '@/database/protocols'

export interface ICollectionGetAll {
  getAll: <Expected>(
    collectionName: string,
    db: DbGetAll,
  ) => Promise<Expected[] | null>
}

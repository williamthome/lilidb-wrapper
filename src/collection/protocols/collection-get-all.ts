import type { IDatabaseGetAll } from '@/database/protocols'

export interface ICollectionGetAll {
  getAll: <Expected>(
    collectionName: string,
    db: IDatabaseGetAll,
  ) => Promise<Expected[] | null>
}

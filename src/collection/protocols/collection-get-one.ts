import type { IDatabaseGetOne } from '@/database/protocols'

export interface ICollectionGetOne {
  getOne: <Expected>(
    collectionName: string,
    db: IDatabaseGetOne,
    by: string,
    matching: unknown,
  ) => Promise<Expected | null>
}

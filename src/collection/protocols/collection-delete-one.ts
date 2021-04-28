import type { DbDeleteOne } from '@/database/protocols'

export interface ICollectionDeleteOne {
  deleteOne: <Expected>(
    collectionName: string,
    db: DbDeleteOne,
    by: string,
    matching: unknown,
  ) => Promise<Expected | null>
}

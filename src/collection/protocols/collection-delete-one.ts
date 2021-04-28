import type { IDatabaseDeleteOne } from '@/database/protocols'

export interface ICollectionDeleteOne {
  deleteOne: <Expected>(
    collectionName: string,
    db: IDatabaseDeleteOne,
    by: string,
    matching: unknown,
  ) => Promise<Expected | null>
}

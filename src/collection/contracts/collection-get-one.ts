import type { IDatabaseGetOne } from '@/database/protocols'
import type { ICollectionGetOne } from '../protocols'

export class CollectionGetOne implements ICollectionGetOne {
  async getOne<Out>(
    collectionName: string,
    db: IDatabaseGetOne,
    by: string,
    matching: unknown,
  ): Promise<Out | null> {
    return await db.getOne(collectionName, by, matching)
  }
}

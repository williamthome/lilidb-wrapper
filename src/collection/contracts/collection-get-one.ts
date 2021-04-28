import type { DbGetOne } from '@/database/protocols'
import type { ICollectionGetOne } from '../protocols'

export class CollectionGetOne implements ICollectionGetOne {
  async getOne<Out>(
    collectionName: string,
    db: DbGetOne,
    by: string,
    matching: unknown,
  ): Promise<Out | null> {
    return await db.getOne(collectionName, by, matching)
  }
}

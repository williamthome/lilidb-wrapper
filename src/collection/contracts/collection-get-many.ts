import type { DbGetMany } from '@/database/protocols'
import type { ICollectionGetMany } from '../protocols'

export class CollectionGetMany implements ICollectionGetMany {
  async getMany<Expected>(
    collectionName: string,
    db: DbGetMany,
    by: string,
    matching: unknown,
  ): Promise<Expected[] | null> {
    return await db.getMany(collectionName, by, matching)
  }
}

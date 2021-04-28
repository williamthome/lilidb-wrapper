import type { IDatabaseGetMany } from '@/database/protocols'
import type { ICollectionGetMany } from '../protocols'

export class CollectionGetMany implements ICollectionGetMany {
  async getMany<Expected>(
    collectionName: string,
    db: IDatabaseGetMany,
    by: string,
    matching: unknown,
  ): Promise<Expected[] | null> {
    return await db.getMany(collectionName, by, matching)
  }
}

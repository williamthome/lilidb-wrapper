import type { DbGetAll } from '@/database/protocols'
import type { ICollectionGetAll } from '../protocols'

export class CollectionGetAll implements ICollectionGetAll {
  async getAll<Expected>(
    collectionName: string,
    db: DbGetAll,
  ): Promise<Expected[] | null> {
    return await db.getAll(collectionName)
  }
}

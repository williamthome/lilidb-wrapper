import type { IDatabaseGetAll } from '@/database/protocols'
import type { ICollectionGetAll } from '../protocols'

export class CollectionGetAll implements ICollectionGetAll {
  async getAll<Expected>(
    collectionName: string,
    db: IDatabaseGetAll,
  ): Promise<Expected[] | null> {
    return await db.getAll(collectionName)
  }
}

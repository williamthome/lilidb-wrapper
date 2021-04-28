import type { DbDeleteOne } from '@/database/protocols'
import type { ICollectionDeleteOne } from '../protocols'

export class CollectionDeleteOne implements ICollectionDeleteOne {
  async deleteOne<Expected>(
    collectionName: string,
    db: DbDeleteOne,
    by: string,
    matching: unknown,
  ): Promise<Expected | null> {
    return await db.deleteOne(collectionName, by, matching)
  }
}

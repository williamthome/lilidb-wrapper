import type { IDatabaseDeleteOne } from '@/database/protocols'
import type { ICollectionDeleteOne } from '../protocols'

export class CollectionDeleteOne implements ICollectionDeleteOne {
  async deleteOne<Expected>(
    collectionName: string,
    db: IDatabaseDeleteOne,
    by: string,
    matching: unknown,
  ): Promise<Expected | null> {
    return await db.deleteOne(collectionName, by, matching)
  }
}

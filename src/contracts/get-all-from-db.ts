import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetAll } from '@/protocols'
import type { IGetAllFromDb } from '@/protocols/crud'

export class GetAllFromDb<TCollections extends Collections>
  implements IGetAllFromDb<TCollections> {
  async getAll<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetAll<TCollections>,
  ): Promise<TExpected[] | null> {
    return await db.getAll(collectionName)
  }
}

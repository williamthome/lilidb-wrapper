import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetAll } from '@/protocols'
import type { IGetAllFromDb } from '@/protocols/crud'

export class GetAllFromDb<TCollection extends Collections<unknown>>
  implements IGetAllFromDb<TCollection> {
  async getAll<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetAll<TCollection>,
  ): Promise<TExpected[] | null> {
    return await db.getAll(collectionName)
  }
}

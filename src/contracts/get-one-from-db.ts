import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetOne } from '@/protocols'
import type { IGetOneFromDb } from '@/protocols/crud'

export class GetOneFromDb<TCollection extends Collections<unknown>>
  implements IGetOneFromDb<TCollection> {
  async getOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetOne<TCollection>,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected | null> {
    return await db.getOne(collectionName, by, matching)
  }
}

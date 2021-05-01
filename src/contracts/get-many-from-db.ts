import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetMany } from '@/protocols'
import type { IGetManyFromDb } from '@/protocols/crud'

export class GetManyFromDb<TCollection extends string>
  implements IGetManyFromDb<TCollection> {
  async getMany<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetMany<TCollection>,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected[] | null> {
    return await db.getMany(collectionName, by, matching)
  }
}

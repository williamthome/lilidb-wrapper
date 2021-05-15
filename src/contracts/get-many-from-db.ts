import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetMany } from '@/protocols'
import type { IGetManyFromDb } from '@/protocols/crud'

export class GetManyFromDb<TCollections extends Collections>
  implements IGetManyFromDb<TCollections> {
  async getMany<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetMany<TCollections>,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected[] | null> {
    return await db.getMany(collectionName, by, matching)
  }
}

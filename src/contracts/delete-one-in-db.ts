import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseDeleteOne } from '@/protocols'
import type { IDeleteOneInDb } from '@/protocols/crud'

export class DeleteOneInDb<TCollections extends Collections>
  implements IDeleteOneInDb<TCollections> {
  async deleteOne<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    db: IDatabaseDeleteOne<TCollections>,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected | null> {
    return await db.deleteOne(collectionName, by, matching)
  }
}

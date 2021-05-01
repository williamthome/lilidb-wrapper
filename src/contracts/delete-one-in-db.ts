import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseDeleteOne } from '@/protocols'
import type { IDeleteOneInDb } from '@/protocols/crud'

export class DeleteOneInDb<TCollection extends Collections<unknown>>
  implements IDeleteOneInDb<TCollection> {
  async deleteOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    db: IDatabaseDeleteOne<TCollection>,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected | null> {
    return await db.deleteOne(collectionName, by, matching)
  }
}

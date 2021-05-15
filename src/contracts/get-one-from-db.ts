import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetOne } from '@/protocols'
import type { IGetOneFromDb } from '@/protocols/crud'

export class GetOneFromDb<TCollections extends Collections>
  implements IGetOneFromDb<TCollections> {
  async getOne<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetOne<TCollections>,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected | null> {
    return await db.getOne(collectionName, by, matching)
  }
}

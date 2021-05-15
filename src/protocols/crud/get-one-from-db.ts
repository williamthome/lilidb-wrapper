import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetOne } from '@/protocols'

export interface IGetOneFromDb<TCollections extends Collections> {
  getOne: <
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
  ) => Promise<TExpected | null>
}

import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'

export interface IDatabaseDeleteOne<TCollections extends Collections> {
  deleteOne: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
  ) => Promise<TExpected | null>
}

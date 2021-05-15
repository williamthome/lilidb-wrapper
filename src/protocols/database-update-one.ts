import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionUpdateTypeByName,
} from '@/types'

export interface IDatabaseUpdateOne<TCollections extends Collections> {
  updateOne: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>,
    TForUpdate extends ExtractCollectionUpdateTypeByName<
      TCollections,
      TCollectionName
    >
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
    as: TForUpdate,
  ) => Promise<TExpected | null>
}

import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionUpdateTypeByName,
} from '@/types'

export interface IDatabaseUpdateOne<TCollection extends Collections<unknown>> {
  updateOne: <
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>,
    TForUpdate extends ExtractCollectionUpdateTypeByName<
      TCollection,
      TCollectionName
    >
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
    as: TForUpdate,
  ) => Promise<TExpected | null>
}

import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'

export interface IDatabaseGetOne<TCollection extends Collections<unknown>> {
  getOne: <
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
  ) => Promise<TExpected | null>
}

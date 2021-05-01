import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetMany } from '@/protocols'

export interface IGetManyFromDb<TCollection extends Collections<unknown>> {
  getMany: <
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetMany<TCollection>,
    by: TBy,
    matching: TMatching,
  ) => Promise<TExpected[] | null>
}

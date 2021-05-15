import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionUpdateTypeByName,
} from '@/types'
import type { IDatabaseUpdateOne } from '@/protocols'
import type { IValidator } from './validator'

export interface IUpdateOneInDb<
  TValidateError,
  TCollections extends Collections
> {
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
    validate: IValidator<TValidateError>,
    db: IDatabaseUpdateOne<TCollections>,
    by: TBy,
    matching: TMatching,
    as: TForUpdate,
  ) => Promise<TExpected | null | TValidateError>
}

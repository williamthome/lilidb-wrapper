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
  TCollection extends Collections<unknown>
> {
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
    validate: IValidator<TValidateError>,
    db: IDatabaseUpdateOne<TCollection>,
    by: TBy,
    matching: TMatching,
    as: TForUpdate,
  ) => Promise<TExpected | null | TValidateError>
}

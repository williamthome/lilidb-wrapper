import type {
  Collections,
  ExtractCollectionCreateTypeByName,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertOne } from '@/protocols'
import type { IParser } from './parser'
import type { IValidator } from './validator'

export interface IInsertOneInDb<
  TValidateError,
  TCollection extends Collections<unknown>
> {
  insertOne: <
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TForCreate extends ExtractCollectionCreateTypeByName<
      TCollection,
      TCollectionName
    >,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    validator: IValidator<TValidateError>,
    db: IDatabaseInsertOne<TCollection>,
    parser: IParser<TForCreate, TExpected>,
    obj: TForCreate,
  ) => Promise<TExpected | null | TValidateError>
}

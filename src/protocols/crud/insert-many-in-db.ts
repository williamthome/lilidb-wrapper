import type {
  Collections,
  ExtractCollectionCreateTypeByName,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertMany } from '@/protocols'
import type { IParser } from './parser'
import type { IValidator } from './validator'

export interface IInsertManyInDb<
  TValidateError,
  TCollection extends Collections<unknown>
> {
  insertMany: <
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TForCreate extends ExtractCollectionCreateTypeByName<
      TCollection,
      TCollectionName
    >,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    validator: IValidator<TValidateError>,
    db: IDatabaseInsertMany<TCollection>,
    parser: IParser<TForCreate, TExpected>,
    ...objs: TForCreate[]
  ) => Promise<TExpected[] | null | TValidateError>
}

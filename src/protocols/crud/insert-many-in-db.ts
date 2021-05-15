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
  TCollections extends Collections
> {
  insertMany: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TForCreate extends ExtractCollectionCreateTypeByName<
      TCollections,
      TCollectionName
    >,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
    validator: IValidator<TValidateError>,
    db: IDatabaseInsertMany<TCollections>,
    parser: IParser<TForCreate, TExpected>,
    ...objs: TForCreate[]
  ) => Promise<TExpected[] | null | TValidateError>
}

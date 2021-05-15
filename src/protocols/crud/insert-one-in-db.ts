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
  TCollections extends Collections
> {
  insertOne: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TForCreate extends ExtractCollectionCreateTypeByName<
      TCollections,
      TCollectionName
    >,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
    validator: IValidator<TValidateError>,
    db: IDatabaseInsertOne<TCollections>,
    parser: IParser<TForCreate, TExpected>,
    obj: TForCreate,
  ) => Promise<TExpected | null | TValidateError>
}

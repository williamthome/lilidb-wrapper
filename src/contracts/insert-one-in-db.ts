import type {
  Collections,
  ExtractCollectionCreateTypeByName,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertOne } from '@/protocols'
import type { IInsertOneInDb, IParser, IValidator } from '@/protocols/crud'

export class InsertOneInDb<
  TValidateError,
  TCollection extends Collections<unknown>
> implements IInsertOneInDb<TValidateError, TCollection> {
  async insertOne<
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
  ): Promise<TExpected | null | TValidateError> {
    const validateError = await validator.validate(obj)
    if (validateError) return validateError
    const parsedObj = await parser.parse(obj)
    return await db.insertOne(collectionName, parsedObj)
  }
}

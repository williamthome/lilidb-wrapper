import type {
  Collections,
  ExtractCollectionCreateTypeByName,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertOne } from '@/protocols'
import type { IInsertOneInDb, IParser, IValidator } from '@/protocols/crud'

export class InsertOneInDb<TValidateError, TCollections extends Collections>
  implements IInsertOneInDb<TValidateError, TCollections> {
  async insertOne<
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
  ): Promise<TExpected | null | TValidateError> {
    const validateError = await validator.validate(obj)
    if (validateError) return validateError
    const parsedObj = await parser.parse(obj)
    return await db.insertOne(collectionName, parsedObj)
  }
}

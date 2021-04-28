import type { IDatabaseInsertOne } from '@/database/protocols'
import type { ICollectionInsertOne, IParser, IValidator } from '../protocols'

export class CollectionInsertOne implements ICollectionInsertOne {
  async insertOne<Payload, Expected, ValidateError>(
    collectionName: string,
    validator: IValidator<ValidateError>,
    db: IDatabaseInsertOne,
    obj: Payload,
    parser: IParser<Payload, Expected>,
  ): Promise<Expected | null | ValidateError> {
    const validateError = await validator.validate(obj)
    if (validateError) return validateError
    const parsedObj = await parser.parse(obj)
    return await db.insertOne(collectionName, parsedObj)
  }
}

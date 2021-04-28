import type { IDatabaseInsertOne } from '@/database/protocols'
import type { IParser } from '@/utils'
import type { ICollectionInsertOne } from '../protocols'

export class CollectionInsertOne implements ICollectionInsertOne {
  async insertOne<Payload, Expected, ValidateError>(
    collectionName: string,
    validate: (payload: Payload) => Promise<void | undefined | ValidateError>,
    db: IDatabaseInsertOne,
    obj: Payload,
    parser: IParser<Payload, Expected>,
  ): Promise<Expected | null | ValidateError> {
    const validateError = await validate(obj)
    if (validateError) return validateError
    const parsedObj = await parser.parse(obj)
    return await db.insertOne(collectionName, parsedObj)
  }
}

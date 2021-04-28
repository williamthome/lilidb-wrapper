import type { IDatabaseInsertOne } from '@/database/protocols'
import type { IParser } from './parser'
import type { IValidator } from './validator'

export interface ICollectionInsertOne {
  insertOne: <Payload, Expected, ValidateError>(
    collectionName: string,
    validate: IValidator<ValidateError>,
    db: IDatabaseInsertOne,
    obj: Payload,
    mapForCreation: IParser<Payload, Expected>,
  ) => Promise<Expected | null | ValidateError>
}

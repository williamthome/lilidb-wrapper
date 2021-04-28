import type { IDatabaseUpdateOne } from '@/database/protocols'
import type { IValidator } from './validator'

export interface ICollectionUpdateOne {
  updateOne: <Payload, Expected, ValidateError>(
    collectionName: string,
    validate: IValidator<ValidateError>,
    db: IDatabaseUpdateOne,
    by: string,
    matching: unknown,
    as: Payload,
  ) => Promise<Expected | null | ValidateError>
}

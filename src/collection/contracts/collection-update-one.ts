import type { IDatabaseUpdateOne } from '@/database/protocols'
import type { ICollectionUpdateOne, IValidator } from '../protocols'

export class CollectionUpdateOne implements ICollectionUpdateOne {
  async updateOne<Payload, Expected, ValidateError>(
    collectionName: string,
    validator: IValidator<ValidateError>,
    db: IDatabaseUpdateOne,
    by: string,
    matching: unknown,
    as: Payload,
  ): Promise<Expected | null | ValidateError> {
    const validateError = await validator.validate(as)
    if (validateError) return validateError
    return await db.updateOne(collectionName, by, matching, as)
  }
}

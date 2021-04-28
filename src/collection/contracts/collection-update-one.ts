import type { DbUpdateOne } from '@/database/protocols'
import type { ICollectionUpdateOne } from '../protocols'

export class CollectionUpdateOne implements ICollectionUpdateOne {
  async updateOne<Payload, Expected, Err>(
    collectionName: string,
    validate: (payload: Payload) => Promise<void | undefined | Err>,
    db: DbUpdateOne,
    by: string,
    matching: unknown,
    as: Payload,
  ): Promise<Expected | null | Err> {
    const validateError = await validate(as)
    if (validateError) return validateError
    return await db.updateOne(collectionName, by, matching, as)
  }
}

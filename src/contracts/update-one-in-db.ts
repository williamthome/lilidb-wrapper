import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionUpdateTypeByName,
} from '@/types'
import type { IDatabaseUpdateOne } from '@/protocols'
import type { IUpdateOneInDb, IValidator } from '@/protocols/crud'

export class UpdateOneInDb<TValidateError, TCollections extends Collections>
  implements IUpdateOneInDb<TValidateError, TCollections> {
  async updateOne<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>,
    TForUpdate extends ExtractCollectionUpdateTypeByName<
      TCollections,
      TCollectionName
    >
  >(
    collectionName: TCollectionName,
    validator: IValidator<TValidateError>,
    db: IDatabaseUpdateOne<TCollections>,
    by: TBy,
    matching: TMatching,
    as: TForUpdate,
  ): Promise<TExpected | null | TValidateError> {
    const validateError = await validator.validate(as)
    if (validateError) return validateError
    return await db.updateOne<
      TCollectionName,
      TExpected,
      TBy,
      TMatching,
      TForUpdate
    >(collectionName, by, matching, as)
  }
}

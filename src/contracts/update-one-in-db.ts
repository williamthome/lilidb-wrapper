import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionUpdateTypeByName,
} from '@/types'
import type { IDatabaseUpdateOne } from '@/protocols'
import type { IUpdateOneInDb, IValidator } from '@/protocols/crud'

export class UpdateOneInDb<
  TValidateError,
  TCollection extends Collections<unknown>
> implements IUpdateOneInDb<TValidateError, TCollection> {
  async updateOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>,
    TForUpdate extends ExtractCollectionUpdateTypeByName<
      TCollection,
      TCollectionName
    >
  >(
    collectionName: TCollectionName,
    validator: IValidator<TValidateError>,
    db: IDatabaseUpdateOne<TCollection>,
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

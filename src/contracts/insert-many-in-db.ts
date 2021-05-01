import type {
  Collections,
  ExtractCollectionCreateTypeByName,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertMany } from '@/protocols'
import type { IInsertManyInDb, IParser, IValidator } from '@/protocols/crud'

export class InsertManyInDb<
  TValidateError,
  TCollection extends Collections<unknown>
> implements IInsertManyInDb<TValidateError, TCollection> {
  async insertMany<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TForCreate extends ExtractCollectionCreateTypeByName<
      TCollection,
      TCollectionName
    >,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    validator: IValidator<TValidateError>,
    db: IDatabaseInsertMany<TCollection>,
    parser: IParser<TForCreate, TExpected>,
    ...objs: TForCreate[]
  ): Promise<TExpected[] | null | TValidateError> {
    const parsedObjs: TExpected[] = []
    for (const obj of objs) {
      const validateError = await validator.validate(obj)
      if (validateError) return validateError
      const parsedObj = await parser.parse(obj)
      parsedObjs.push(parsedObj)
    }
    return await db.insertMany(collectionName, ...parsedObjs)
  }
}

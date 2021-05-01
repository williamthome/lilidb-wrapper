import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetAll } from '@/protocols'

export interface IGetAllFromDb<TCollection extends Collections<unknown>> {
  getAll: <
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetAll<TCollection>,
  ) => Promise<TExpected[] | null>
}

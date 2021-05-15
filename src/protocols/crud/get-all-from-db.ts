import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseGetAll } from '@/protocols'

export interface IGetAllFromDb<TCollections extends Collections> {
  getAll: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
    db: IDatabaseGetAll<TCollections>,
  ) => Promise<TExpected[] | null>
}

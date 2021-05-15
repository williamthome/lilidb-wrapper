import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'

export interface IDatabaseGetAll<TCollections extends Collections> {
  getAll: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
  ) => Promise<TExpected[] | null>
}

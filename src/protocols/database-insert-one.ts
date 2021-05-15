import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'

export interface IDatabaseInsertOne<TCollections extends Collections> {
  insertOne: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
    obj: TExpected,
  ) => Promise<TExpected | null>
}

import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'

export interface IDatabaseInsertMany<TCollections extends Collections> {
  insertMany: <
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
    ...objs: TExpected[]
  ) => Promise<TExpected[] | null>
}

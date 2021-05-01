import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'

export interface IDatabaseInsertMany<TCollection extends Collections<unknown>> {
  insertMany: <
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    ...objs: TExpected[]
  ) => Promise<TExpected[] | null>
}

import type { ICollectionTypesFactory } from './collection-types-factory'

export interface ICollectionFactory {
  collectionName: <CollectionName extends string>(
    collectionName: CollectionName,
  ) => ICollectionTypesFactory<CollectionName>
}

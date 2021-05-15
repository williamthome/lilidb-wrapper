import type { IDefineCollectionTypes } from './define-collection-types'

export interface ICreateCollection {
  create: <TName extends string>(
    collectionName: TName,
  ) => IDefineCollectionTypes<TName>
}

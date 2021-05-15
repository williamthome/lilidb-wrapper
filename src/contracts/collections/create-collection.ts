import type {
  ICreateCollection,
  IDefineCollectionTypes,
} from '@/protocols/collections'
import { DefineCollectionTypes } from './define-collection-types'

export class CreateCollection implements ICreateCollection {
  create = <CollectionName extends string>(
    name: CollectionName,
  ): IDefineCollectionTypes<CollectionName> => new DefineCollectionTypes(name)
}

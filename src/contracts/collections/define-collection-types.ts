import type { IDefineCollectionTypes } from '@/protocols/collections'
import type { Collection } from '@/types'
import type { DeepPartial } from '@/types/helpers'
import { CollectionWrapper } from '@/wrappers'

export class DefineCollectionTypes<CollectionName extends string>
  implements IDefineCollectionTypes<CollectionName> {
  constructor(private readonly _collectionName: CollectionName) {}

  defineTypes<T, TForUpdate = DeepPartial<T>, TForCreate = T>(): Collection<
    CollectionName,
    T,
    TForUpdate,
    TForCreate
  > {
    return new CollectionWrapper<CollectionName, T, TForUpdate, TForCreate>(
      this._collectionName,
    )
  }
}

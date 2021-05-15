import type { Collection } from '@/types'
import type { DeepPartial } from '@/types/helpers'

export interface IDefineCollectionTypes<CollectionName extends string> {
  defineTypes: <T, TForUpdate = DeepPartial<T>, TForCreate = T>() => Collection<
    CollectionName,
    T,
    TForUpdate,
    TForCreate
  >
}

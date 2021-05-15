import type { DeepPartial } from '@/types/helpers'
import type { CollectionWrapper } from '@/wrappers'

export interface ICollectionTypesFactory<CollectionName extends string> {
  types: <
    T,
    TForUpdate = DeepPartial<T>,
    TForCreate = T
  >() => CollectionWrapper<CollectionName, T, TForUpdate, TForCreate>
}

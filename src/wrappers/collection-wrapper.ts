import type { Collection } from '@/types'
import type { DeepPartial } from '@/types/helpers'

export class CollectionWrapper<
  CollectionName extends string,
  T,
  TForUpdate = DeepPartial<T>,
  TForCreate = T
> implements Collection<CollectionName, T, TForUpdate, TForCreate> {
  public readonly superType!: T
  public readonly updateType!: TForUpdate
  public readonly createType!: TForCreate

  constructor(public readonly collectionName: CollectionName) {}
}

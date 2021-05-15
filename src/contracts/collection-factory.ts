import type {
  ICollectionFactory,
  ICollectionTypesFactory,
} from '@/protocols/collections'
import type { DeepPartial } from '@/types/helpers'
import { CollectionWrapper } from '@/wrappers'

export class CollectionFactory implements ICollectionFactory {
  collectionName = <TName extends string>(
    name: TName,
  ): ICollectionTypesFactory<TName> => ({
    types: <
      T,
      TForUpdate = DeepPartial<T>,
      TForCreate = T
    >(): CollectionWrapper<TName, T, TForUpdate, TForCreate> =>
      new CollectionWrapper<TName, T, TForUpdate, TForCreate>(name),
  })
}

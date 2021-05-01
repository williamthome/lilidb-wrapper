import type {
  Collections,
  Collection,
  ExtractCollectionNames,
  ExtractCollectionTypes,
  ExtractCollectionTypeByName,
  ExtractCollectionUpdateTypeByName,
  ExtractCollectionCreateTypeByName,
  ExtractCollectionNameByType,
} from '@/types'
import type { Bar, Foo } from './expected-mock'

export type FoobarCollection = Collections<
  [Collection<'fooCollection', Foo>, Collection<'barCollection', Bar>]
>

export type FoobarCollectionNames = ExtractCollectionNames<FoobarCollection>
export type FoobarCollectionTypes = ExtractCollectionTypes<FoobarCollection>

export type FooCollectionType = ExtractCollectionTypeByName<
  FoobarCollection,
  'fooCollection'
>
export type FooCollectionTypeForUpdate = ExtractCollectionUpdateTypeByName<
  FoobarCollection,
  'fooCollection'
>
export type FooCollectionTypeForCreate = ExtractCollectionCreateTypeByName<
  FoobarCollection,
  'fooCollection'
>
export type FooCollectionName = ExtractCollectionNameByType<
  FoobarCollection,
  Foo
>

export type BarCollectionType = ExtractCollectionTypeByName<
  FoobarCollection,
  'barCollection'
>
export type BarCollectionTypeForUpdate = ExtractCollectionUpdateTypeByName<
  FoobarCollection,
  'barCollection'
>
export type BarCollectionTypeForCreate = ExtractCollectionCreateTypeByName<
  FoobarCollection,
  'barCollection'
>
export type BarCollectionName = ExtractCollectionNameByType<
  FoobarCollection,
  Bar
>

export const collectionNameMock: FoobarCollectionNames = 'fooCollection'

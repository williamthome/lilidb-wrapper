/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DeepPartial } from './helpers/deep-partial'

export type Collection<
  CollectionName extends string,
  T,
  TForUpdate = DeepPartial<T>,
  TForCreate = T
> = {
  name: CollectionName
  types: {
    type: T
    updateType: TForUpdate
    createType: TForCreate
  }
}

export type Collections<
  T extends Array<Collection<string, unknown, unknown, unknown>> | unknown
> = T

export type ExtractCollectionNames<T> = T extends Array<infer TCollections>
  ? TCollections extends Array<infer TCollection>
    ? TCollection extends Collection<infer TName, any, any, any>
      ? TName
      : string
    : string
  : string

export type ExtractCollectionTypes<T> = T extends Array<infer TCollections>
  ? TCollections extends Array<infer TCollection>
    ? TCollection extends Collection<any, infer TType, any, any>
      ? TType
      : unknown
    : unknown
  : unknown

export type ExtractCollectionTypeByName<
  T,
  TCollectionName extends ExtractCollectionNames<T>
> = T extends Array<infer TCollection>
  ? TCollection extends Collection<infer TName, infer TType, any, any>
    ? TName extends TCollectionName
      ? TType
      : never
    : unknown
  : unknown

export type ExtractCollectionUpdateTypeByName<
  T,
  TCollectionName extends ExtractCollectionNames<T>
> = T extends Array<infer TCollection>
  ? TCollection extends Collection<infer TName, any, infer TType, any>
    ? TName extends TCollectionName
      ? TType
      : never
    : unknown
  : unknown

export type ExtractCollectionCreateTypeByName<
  T,
  TCollectionName extends ExtractCollectionNames<T>
> = T extends Array<infer TCollection>
  ? TCollection extends Collection<infer TName, any, any, infer TType>
    ? TName extends TCollectionName
      ? TType
      : never
    : unknown
  : unknown

export type ExtractCollectionNameByType<
  T,
  TCollectionType extends ExtractCollectionTypes<T>
> = T extends Array<infer TCollection>
  ? TCollection extends Collection<infer TName, infer TType, any, any>
    ? TType extends TCollectionType
      ? TName
      : never
    : string
  : string

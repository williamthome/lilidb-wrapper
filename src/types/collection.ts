/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CollectionName<TName extends string> {
  collectionName: TName
}

export interface CollectionTypes<T, TForUpdate, TForCreate> {
  superType: T
  updateType: TForUpdate
  createType: TForCreate
}

export type Collection<
  TName extends string,
  T,
  TForUpdate,
  TForCreate
> = CollectionName<TName> & CollectionTypes<T, TForUpdate, TForCreate>

export type AnyCollection = Collection<string, unknown, unknown, unknown>

export type Collections<T extends AnyCollection[] = AnyCollection[]> = T

export type ExtractCollectionNames<T> = T extends Array<infer TCollection>
  ? TCollection extends CollectionName<infer TName>
    ? TName
    : string
  : string

export type ExtractCollectionTypes<T> = T extends Array<infer TCollection>
  ? TCollection extends CollectionTypes<infer TType, any, any>
    ? TType
    : unknown
  : unknown

export type ExtractCollectionTypeByName<
  T,
  TCollectionName extends ExtractCollectionNames<T>
> = T extends Array<infer TCollection>
  ? TCollection extends CollectionName<infer TName>
    ? TName extends TCollectionName
      ? TCollection extends CollectionTypes<infer TType, any, any>
        ? TType
        : never
      : never
    : unknown
  : unknown

export type ExtractCollectionUpdateTypeByName<
  T,
  TCollectionName extends ExtractCollectionNames<T>
> = T extends Array<infer TCollection>
  ? TCollection extends CollectionName<infer TName>
    ? TName extends TCollectionName
      ? TCollection extends CollectionTypes<any, infer TType, any>
        ? TType
        : never
      : never
    : unknown
  : unknown

export type ExtractCollectionCreateTypeByName<
  T,
  TCollectionName extends ExtractCollectionNames<T>
> = T extends Array<infer TCollection>
  ? TCollection extends CollectionName<infer TName>
    ? TName extends TCollectionName
      ? TCollection extends CollectionTypes<any, any, infer TType>
        ? TType
        : never
      : never
    : unknown
  : unknown

export type ExtractCollectionNameByType<
  T,
  TCollectionType extends ExtractCollectionTypes<T>
> = T extends Array<infer TCollection>
  ? TCollection extends CollectionTypes<infer TType, any, any>
    ? TType extends TCollectionType
      ? TCollection extends CollectionName<infer TName>
        ? TName
        : never
      : never
    : string
  : string

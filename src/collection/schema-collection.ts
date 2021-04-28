import type {
  ICollectionDeleteOne,
  ICollectionGetAll,
  ICollectionGetMany,
  ICollectionGetOne,
  ICollectionInsertOne,
  ICollectionUpdateOne,
  IParser,
} from './protocols'
import {
  CollectionDeleteOne,
  CollectionGetAll,
  CollectionGetMany,
  CollectionGetOne,
  CollectionInsertOne,
  CollectionUpdateOne,
} from './contracts'
import { Collection } from './collection'
import type {
  ExtractCompleteSchema,
  ExtractSchemaForCreation,
  ExtractSchemaForModify,
  Schema,
  ValidationType,
  ValidateError,
} from '@williamthome/lilischema'

export class SchemaCollection<
  T,
  VT extends ValidationType,
  S extends Schema<T, VT>
> extends Collection<
  ExtractSchemaForCreation<S>,
  ExtractSchemaForModify<S>,
  ExtractCompleteSchema<S>,
  ValidateError
> {
  constructor(
    name: string,
    schema: S,
    insertParser: IParser<
      ExtractSchemaForCreation<S>,
      ExtractCompleteSchema<S>
    >,
    collectionInsertOne: ICollectionInsertOne = new CollectionInsertOne(),
    collectionGetOne: ICollectionGetOne = new CollectionGetOne(),
    collectionGetMany: ICollectionGetMany = new CollectionGetMany(),
    collectionGetAll: ICollectionGetAll = new CollectionGetAll(),
    collectionUpdateOne: ICollectionUpdateOne = new CollectionUpdateOne(),
    collectionDeleteOne: ICollectionDeleteOne = new CollectionDeleteOne(),
  ) {
    super(
      name,
      insertParser,
      { validate: schema.validate },
      {
        validate: (payload) =>
          schema.validate(payload, { isPartialValidation: true }),
      },
      collectionInsertOne,
      collectionGetOne,
      collectionGetMany,
      collectionGetAll,
      collectionUpdateOne,
      collectionDeleteOne,
    )
  }
}

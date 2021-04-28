import type { IParser } from '@/utils'
import type {
  DbDeleteOne,
  DbGetAll,
  DbGetMany,
  DbGetOne,
  DbInsertOne,
  DbUpdateOne,
} from '@/database/protocols'
import type {
  ICollectionDeleteOne,
  ICollectionGetAll,
  ICollectionGetMany,
  ICollectionGetOne,
  ICollectionInsertOne,
  ICollectionUpdateOne,
} from './protocols'
import {
  CollectionDeleteOne,
  CollectionGetAll,
  CollectionGetMany,
  CollectionGetOne,
  CollectionInsertOne,
  CollectionUpdateOne,
} from './contracts'
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
> {
  constructor(
    public readonly name: string,
    public readonly schema: S,
    private readonly _parser: IParser<
      ExtractSchemaForCreation<S>,
      ExtractCompleteSchema<S>
    >,
    private readonly _collectionInsertOne: ICollectionInsertOne = new CollectionInsertOne(),
    private readonly _collectionGetOne: ICollectionGetOne = new CollectionGetOne(),
    private readonly _collectionGetMany: ICollectionGetMany = new CollectionGetMany(),
    private readonly _collectionGetAll: ICollectionGetAll = new CollectionGetAll(),
    private readonly _collectionUpdateOne: ICollectionUpdateOne = new CollectionUpdateOne(),
    private readonly _collectionDeleteOne: ICollectionDeleteOne = new CollectionDeleteOne(),
  ) {}

  async insertOne(
    db: DbInsertOne,
    obj: ExtractSchemaForCreation<S>,
  ): Promise<ExtractCompleteSchema<S> | null | ValidateError> {
    return await this._collectionInsertOne.insertOne(
      this.name,
      this.schema.validate,
      db,
      obj,
      this._parser,
    )
  }

  async getOne<
    By extends keyof ExtractCompleteSchema<S> & string,
    Matching extends ExtractCompleteSchema<S>[By]
  >(
    db: DbGetOne,
    by: By,
    matching: Matching,
  ): Promise<ExtractCompleteSchema<S> | null> {
    return await this._collectionGetOne.getOne(this.name, db, by, matching)
  }

  async getMany<
    By extends keyof ExtractCompleteSchema<S> & string,
    Matching extends ExtractCompleteSchema<S>[By]
  >(
    db: DbGetMany,
    by: By,
    matching: Matching,
  ): Promise<ExtractCompleteSchema<S>[] | null> {
    return await this._collectionGetMany.getMany(this.name, db, by, matching)
  }

  async getAll(db: DbGetAll): Promise<ExtractCompleteSchema<S>[] | null> {
    return await this._collectionGetAll.getAll(this.name, db)
  }

  async updateOne<
    By extends keyof ExtractCompleteSchema<S> & string,
    Matching extends ExtractCompleteSchema<S>[By],
    As extends ExtractSchemaForModify<S>
  >(
    db: DbUpdateOne,
    by: By,
    matching: Matching,
    as: As,
  ): Promise<ExtractCompleteSchema<S> | null | ValidateError> {
    return await this._collectionUpdateOne.updateOne(
      this.name,
      (payload) => this.schema.validate(payload, { isPartialValidation: true }),
      db,
      by,
      matching,
      as,
    )
  }

  async deleteOne<
    By extends keyof ExtractCompleteSchema<S> & string,
    Matching extends ExtractCompleteSchema<S>[By]
  >(
    db: DbDeleteOne,
    by: By,
    matching: Matching,
  ): Promise<ExtractCompleteSchema<S> | null> {
    return await this._collectionDeleteOne.deleteOne(
      this.name,
      db,
      by,
      matching,
    )
  }
}

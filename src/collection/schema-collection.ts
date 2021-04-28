import type { IParser } from '@/utils'
import type {
  IDatabaseDeleteOne,
  IDatabaseGetAll,
  IDatabaseGetMany,
  IDatabaseGetOne,
  IDatabaseInsertOne,
  IDatabaseTransaction,
  IDatabaseUpdateOne,
} from '@/database/protocols'
import type {
  ICollectionDeleteOne,
  ICollectionGetAll,
  ICollectionGetMany,
  ICollectionGetOne,
  ICollectionInsertOne,
  ICollectionUpdateOne,
  ICollectionUsingTransaction,
} from './protocols'
import {
  CollectionDeleteOne,
  CollectionGetAll,
  CollectionGetMany,
  CollectionGetOne,
  CollectionInsertOne,
  CollectionUpdateOne,
  CollectionUsingTransaction,
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
    private readonly _collectionUsingTransaction: ICollectionUsingTransaction = new CollectionUsingTransaction(),
    private readonly _collectionInsertOne: ICollectionInsertOne = new CollectionInsertOne(),
    private readonly _collectionGetOne: ICollectionGetOne = new CollectionGetOne(),
    private readonly _collectionGetMany: ICollectionGetMany = new CollectionGetMany(),
    private readonly _collectionGetAll: ICollectionGetAll = new CollectionGetAll(),
    private readonly _collectionUpdateOne: ICollectionUpdateOne = new CollectionUpdateOne(),
    private readonly _collectionDeleteOne: ICollectionDeleteOne = new CollectionDeleteOne(),
  ) {}

  async usingTransaction<T>(
    db: IDatabaseTransaction,
    doThis: () => Promise<T>,
  ): Promise<T | null> {
    return await this._collectionUsingTransaction.usingTransaction(db, doThis)
  }

  async insertOne(
    db: IDatabaseInsertOne,
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
    db: IDatabaseGetOne,
    by: By,
    matching: Matching,
  ): Promise<ExtractCompleteSchema<S> | null> {
    return await this._collectionGetOne.getOne(this.name, db, by, matching)
  }

  async getMany<
    By extends keyof ExtractCompleteSchema<S> & string,
    Matching extends ExtractCompleteSchema<S>[By]
  >(
    db: IDatabaseGetMany,
    by: By,
    matching: Matching,
  ): Promise<ExtractCompleteSchema<S>[] | null> {
    return await this._collectionGetMany.getMany(this.name, db, by, matching)
  }

  async getAll(
    db: IDatabaseGetAll,
  ): Promise<ExtractCompleteSchema<S>[] | null> {
    return await this._collectionGetAll.getAll(this.name, db)
  }

  async updateOne<
    By extends keyof ExtractCompleteSchema<S> & string,
    Matching extends ExtractCompleteSchema<S>[By],
    As extends ExtractSchemaForModify<S>
  >(
    db: IDatabaseUpdateOne,
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
    db: IDatabaseDeleteOne,
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

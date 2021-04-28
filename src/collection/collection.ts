import type {
  IDatabaseDeleteOne,
  IDatabaseGetAll,
  IDatabaseGetMany,
  IDatabaseGetOne,
  IDatabaseInsertOne,
  IDatabaseUpdateOne,
} from '@/database/protocols'
import type {
  ICollectionDeleteOne,
  ICollectionGetAll,
  ICollectionGetMany,
  ICollectionGetOne,
  ICollectionInsertOne,
  ICollectionUpdateOne,
  IParser,
  IValidator,
} from './protocols'
import {
  CollectionDeleteOne,
  CollectionGetAll,
  CollectionGetMany,
  CollectionGetOne,
  CollectionInsertOne,
  CollectionUpdateOne,
} from './contracts'

export class Collection<TForInsert, TForUpdate, TExpected, ValidateError> {
  constructor(
    public readonly name: string,
    private readonly _insertParser: IParser<TForInsert, TExpected>,
    private readonly _insertValidator: IValidator<ValidateError>,
    private readonly _updateValidator: IValidator<ValidateError>,
    private readonly _collectionInsertOne: ICollectionInsertOne = new CollectionInsertOne(),
    private readonly _collectionGetOne: ICollectionGetOne = new CollectionGetOne(),
    private readonly _collectionGetMany: ICollectionGetMany = new CollectionGetMany(),
    private readonly _collectionGetAll: ICollectionGetAll = new CollectionGetAll(),
    private readonly _collectionUpdateOne: ICollectionUpdateOne = new CollectionUpdateOne(),
    private readonly _collectionDeleteOne: ICollectionDeleteOne = new CollectionDeleteOne(),
  ) {}

  async insertOne(
    db: IDatabaseInsertOne,
    obj: TForInsert,
  ): Promise<TExpected | null | ValidateError> {
    return await this._collectionInsertOne.insertOne(
      this.name,
      this._insertValidator,
      db,
      obj,
      this._insertParser,
    )
  }

  async getOne<
    By extends keyof TExpected & string,
    Matching extends TExpected[By]
  >(
    db: IDatabaseGetOne,
    by: By,
    matching: Matching,
  ): Promise<TExpected | null> {
    return await this._collectionGetOne.getOne(this.name, db, by, matching)
  }

  async getMany<
    By extends keyof TExpected & string,
    Matching extends TExpected[By]
  >(
    db: IDatabaseGetMany,
    by: By,
    matching: Matching,
  ): Promise<TExpected[] | null> {
    return await this._collectionGetMany.getMany(this.name, db, by, matching)
  }

  async getAll(db: IDatabaseGetAll): Promise<TExpected[] | null> {
    return await this._collectionGetAll.getAll(this.name, db)
  }

  async updateOne<
    By extends keyof TExpected & string,
    Matching extends TExpected[By],
    As extends TForUpdate
  >(
    db: IDatabaseUpdateOne,
    by: By,
    matching: Matching,
    as: As,
  ): Promise<TExpected | null | ValidateError> {
    return await this._collectionUpdateOne.updateOne(
      this.name,
      this._updateValidator,
      db,
      by,
      matching,
      as,
    )
  }

  async deleteOne<
    By extends keyof TExpected & string,
    Matching extends TExpected[By]
  >(
    db: IDatabaseDeleteOne,
    by: By,
    matching: Matching,
  ): Promise<TExpected | null> {
    return await this._collectionDeleteOne.deleteOne(
      this.name,
      db,
      by,
      matching,
    )
  }
}

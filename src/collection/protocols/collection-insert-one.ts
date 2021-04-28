import type { DbInsertOne } from '@/database/protocols'
import type { IParser } from '@/utils'

export interface ICollectionInsertOne {
  insertOne: <Payload, Expected, Err>(
    collectionName: string,
    validate: (payload: Payload) => Promise<void | undefined | Err>,
    db: DbInsertOne,
    obj: Payload,
    mapForCreation: IParser<Payload, Expected>,
  ) => Promise<Expected | null | Err>
}

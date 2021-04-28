import type { IDatabaseInsertOne } from '@/database/protocols'
import type { IParser } from '@/utils'

export interface ICollectionInsertOne {
  insertOne: <Payload, Expected, Err>(
    collectionName: string,
    validate: (payload: Payload) => Promise<void | undefined | Err>,
    db: IDatabaseInsertOne,
    obj: Payload,
    mapForCreation: IParser<Payload, Expected>,
  ) => Promise<Expected | null | Err>
}

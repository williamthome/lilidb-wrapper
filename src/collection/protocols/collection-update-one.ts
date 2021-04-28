import type { IDatabaseUpdateOne } from '@/database/protocols'

export interface ICollectionUpdateOne {
  updateOne: <Payload, Expected, Err>(
    collectionName: string,
    validate: (payload: Payload) => Promise<void | undefined | Err>,
    db: IDatabaseUpdateOne,
    by: string,
    matching: unknown,
    as: Payload,
  ) => Promise<Expected | null | Err>
}
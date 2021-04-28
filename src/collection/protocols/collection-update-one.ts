import type { DbUpdateOne } from '@/database/protocols'

export interface ICollectionUpdateOne {
  updateOne: <Payload, Expected, Err>(
    collectionName: string,
    validate: (payload: Payload) => Promise<void | undefined | Err>,
    db: DbUpdateOne,
    by: string,
    matching: unknown,
    as: Payload,
  ) => Promise<Expected | null | Err>
}

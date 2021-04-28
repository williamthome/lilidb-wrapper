import type { IDatabaseTransaction } from '@/database/protocols'
import type { ICollectionUsingTransaction } from '../protocols'

export class CollectionUsingTransaction implements ICollectionUsingTransaction {
  async usingTransaction<Expected>(
    db: IDatabaseTransaction,
    doThis: () => Promise<Expected>,
  ): Promise<Expected | null> {
    try {
      await db.startTransaction()
      const done = await doThis()
      await db.commitTransaction()
      return done
    } catch {
      await db.rollback()
      return null
    }
  }
}

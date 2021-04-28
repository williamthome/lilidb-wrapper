import type { IDatabaseTransaction } from '@/database/protocols'
import type { IUsingTransaction } from '../protocols'

export class UsingTransaction implements IUsingTransaction {
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

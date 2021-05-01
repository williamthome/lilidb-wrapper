import type { IDatabaseTransaction } from '@/protocols'
import type { IToDo, IUsingTransaction } from '@/protocols/crud'

export class UsingTransaction implements IUsingTransaction {
  async usingTransaction<TExpected>(
    db: IDatabaseTransaction,
    todo: IToDo<TExpected>,
  ): Promise<TExpected | null> {
    try {
      await db.startTransaction()
      const done = await todo.doThis()
      await db.commitTransaction()
      return done
    } catch {
      await db.rollback()
      return null
    }
  }
}

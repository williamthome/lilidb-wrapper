import type { IDatabaseConnection } from '@/protocols'
import type { IToDo, IUsingConnection } from '@/protocols/crud'

export class UsingConnection implements IUsingConnection {
  async usingConnection<TExpected>(
    db: IDatabaseConnection,
    todo: IToDo<TExpected>,
    disconnectWhenDone?: boolean,
  ): Promise<TExpected | null> {
    try {
      !db.isConnected && (await db.connect())
      const done = await todo.doThis()
      return done
    } catch {
      return null
    } finally {
      db.isConnected && disconnectWhenDone && (await db.disconnect())
    }
  }
}

import type { IDatabaseConnection } from '@/database/protocols'
import type { IUsingConnection } from '../protocols'

export class UsingConnection implements IUsingConnection {
  async usingConnection<Expected>(
    db: IDatabaseConnection,
    doThis: () => Promise<Expected>,
    disconnectWhenDone?: boolean,
  ): Promise<Expected | null> {
    try {
      !db.isConnected && (await db.connect())
      const done = await doThis()
      disconnectWhenDone && (await db.disconnect())
      return done
    } catch {
      db.isConnected && disconnectWhenDone && (await db.disconnect())
      return null
    }
  }
}

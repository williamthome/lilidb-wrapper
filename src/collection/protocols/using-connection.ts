import type { IDatabaseConnection } from '@/database/protocols'

export interface IUsingConnection {
  usingConnection: <Expected>(
    db: IDatabaseConnection,
    doThis: () => Promise<Expected>,
    disconnectWhenDone?: boolean,
  ) => Promise<Expected | null>
}

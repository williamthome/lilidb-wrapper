import type { IDatabaseConnection } from '../database-connection'
import type { IDatabaseTransaction } from '../database-transaction'
import type { IToDo } from './to-do'

export interface IUsingConnectionDoTransaction {
  usingConnectionDoTransaction: <TExpected>(
    db: IDatabaseConnection & IDatabaseTransaction,
    todo: IToDo<TExpected>,
    disconnectWhenDone?: boolean,
  ) => Promise<TExpected | null>
}

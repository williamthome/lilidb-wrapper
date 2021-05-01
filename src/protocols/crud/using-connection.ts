import type { IDatabaseConnection } from '@/protocols'
import type { IToDo } from './to-do'

export interface IUsingConnection {
  usingConnection: <TExpected>(
    db: IDatabaseConnection,
    todo: IToDo<TExpected>,
    disconnectWhenDone?: boolean,
  ) => Promise<TExpected | null>
}

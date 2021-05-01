import type { IDatabaseTransaction } from '@/protocols'
import type { IToDo } from './to-do'

export interface IUsingTransaction {
  usingTransaction: <TExpected>(
    db: IDatabaseTransaction,
    todo: IToDo<TExpected>,
  ) => Promise<TExpected | null>
}

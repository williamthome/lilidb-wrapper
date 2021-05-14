import type { IDatabaseTransaction } from '@/protocols'
import type { IToDo, IUsingTransaction } from '@/protocols/crud'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IUsingTransactionSpy extends Spy implements IUsingTransaction {
  result?: null | unknown
  shouldReturnNull = false

  db?: IDatabaseTransaction
  todo?: IToDo<unknown>

  async usingTransaction<TExpected>(
    db: IDatabaseTransaction,
    todo: IToDo<TExpected>,
  ): Promise<TExpected | null> {
    this.db = db
    this.todo = todo

    this.throwErrorIfShouldThrow()

    return await todo.doThis()
  }
}

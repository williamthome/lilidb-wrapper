import type { IDatabaseConnection } from '@/protocols'
import type { IToDo, IUsingConnection } from '@/protocols/crud'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IUsingConnectionSpy extends Spy implements IUsingConnection {
  result?: null | unknown
  shouldReturnNull = false

  db?: IDatabaseConnection
  todo?: IToDo<unknown>
  disconnectWhenDone?: boolean

  async usingConnection<TExpected>(
    db: IDatabaseConnection,
    todo: IToDo<TExpected>,
    disconnectWhenDone?: boolean,
  ): Promise<TExpected | null> {
    this.db = db
    this.todo = todo
    this.disconnectWhenDone = disconnectWhenDone

    this.throwErrorIfShouldThrow()

    return await todo.doThis()
  }
}

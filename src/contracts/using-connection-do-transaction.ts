import type { IDatabaseConnection, IDatabaseTransaction } from '@/protocols'
import type {
  IToDo,
  IUsingConnection,
  IUsingConnectionDoTransaction,
  IUsingTransaction,
} from '@/protocols/crud'

export class UsingConnectionDoTransaction
  implements IUsingConnectionDoTransaction {
  constructor(
    private readonly _usingConnection: IUsingConnection,
    private readonly _usingTransaction: IUsingTransaction,
  ) {}

  async usingConnectionDoTransaction<TExpected>(
    db: IDatabaseConnection & IDatabaseTransaction,
    todo: IToDo<TExpected>,
    disconnectWhenDone?: boolean,
  ): Promise<TExpected | null> {
    return await this._usingConnection.usingConnection(
      db,
      {
        doThis: async () =>
          await this._usingTransaction.usingTransaction(db, todo),
      },
      disconnectWhenDone,
    )
  }
}

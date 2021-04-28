import type { IDatabaseTransaction } from '@/database/protocols'

export interface IUsingTransaction {
  usingTransaction: <Expected>(
    db: IDatabaseTransaction,
    doThis: () => Promise<Expected>,
  ) => Promise<Expected | null>
}

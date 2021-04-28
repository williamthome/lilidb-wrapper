import type { IDatabaseTransaction } from '@/database/protocols'

export interface ICollectionUsingTransaction {
  usingTransaction: <Expected>(
    db: IDatabaseTransaction,
    doThis: () => Promise<Expected>,
  ) => Promise<Expected | null>
}

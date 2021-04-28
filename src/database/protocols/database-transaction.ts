export interface IDatabaseTransaction {
  inTransaction: boolean
  startTransaction: () => Promise<void>
  commitTransaction: () => Promise<void>
  rollback: () => Promise<void>
}

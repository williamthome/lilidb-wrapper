import type { IDatabaseTransaction } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseTransactionSpy
  extends Spy
  implements IDatabaseTransaction {
  data: string | undefined
  snapshot: string | undefined

  inTransaction = false

  constructor(readonly initialData = 'foo', readonly expectedData = 'bar') {
    super()
    this.data = initialData
  }

  async startTransaction() {
    this.throwErrorIfShouldThrow()
    this.snapshot = this.data
    this.inTransaction = true
  }

  async commitTransaction() {
    this.throwErrorIfShouldThrow()
    this.data = this.expectedData
    this.snapshot = undefined
    this.inTransaction = false
  }

  async rollback() {
    this.throwErrorIfShouldThrow()
    this.data = this.snapshot
    this.inTransaction = false
  }
}

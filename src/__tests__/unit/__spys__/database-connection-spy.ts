import type { IDatabaseConnection } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseConnectionSpy extends Spy implements IDatabaseConnection {
  isConnected = false

  async connect() {
    this.throwErrorIfShouldThrow()
    this.isConnected = true
  }

  async disconnect() {
    this.throwErrorIfShouldThrow()
    this.isConnected = false
  }
}

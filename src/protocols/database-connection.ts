export interface IDatabaseConnection {
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

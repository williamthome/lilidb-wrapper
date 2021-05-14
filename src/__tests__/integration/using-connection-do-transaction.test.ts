import {
  UsingConnection,
  UsingConnectionDoTransaction,
  UsingTransaction,
} from '@/contracts'
import { MapDbWrapper } from '@/wrappers'

describe('UsingConnectionDoTransaction', () => {
  function makeSut() {
    const expected = { foo: 'foo' }
    const usingConnection = new UsingConnection()
    const usingTransaction = new UsingTransaction()
    const db = new MapDbWrapper()

    return {
      db,
      sut: new UsingConnectionDoTransaction(usingConnection, usingTransaction),
      expected,
    }
  }

  it('should result null if todo throws', async () => {
    const { sut, db } = makeSut()
    const result = await sut.usingConnectionDoTransaction(db, {
      doThis: async () => {
        throw new Error()
      },
    })
    expect(result).toBeNull()
  })

  it('should result be equal expected', async () => {
    const { sut, db, expected } = makeSut()
    const result = await sut.usingConnectionDoTransaction(db, {
      doThis: async () => expected,
    })
    expect(result).toEqual(expected)
  })
})

import { UsingConnection } from '@/contracts'
import { mockCreated } from '../__mocks__'
import { IDatabaseConnectionSpy, IToDoSpy } from '../__spys__'

describe('UsingConnection', () => {
  function makeSut() {
    const expected = mockCreated
    return {
      db: new IDatabaseConnectionSpy(),
      todo: new IToDoSpy(expected),
      sut: new UsingConnection(),
      expected,
    }
  }

  it('should connect if disconnected', async () => {
    const { sut, db, todo } = makeSut()
    await sut.usingConnection(db, todo)
    expect(db.isConnected).toBe(true)
  })

  it('should stay connect', async () => {
    const { sut, db, todo } = makeSut()
    db.isConnected = true
    await sut.usingConnection(db, todo)
    expect(db.isConnected).toBe(true)
  })

  it('should disconnect when done', async () => {
    const { sut, db, todo } = makeSut()
    await sut.usingConnection(db, todo, true)
    expect(db.isConnected).toBe(false)
  })

  it('should return null if db throws', async () => {
    const { sut, db, todo } = makeSut()
    db.throwable.shouldThrow = true
    const result = await sut.usingConnection(db, todo)
    expect(result).toBeNull()
  })

  it('should return null and stay connected if todo throws', async () => {
    const { sut, db, todo } = makeSut()
    todo.throwable.shouldThrow = true
    const result = await sut.usingConnection(db, todo)
    expect(db.isConnected).toBe(true)
    expect(result).toBeNull()
  })

  it('should return null and disconnect if db throws', async () => {
    const { sut, db, todo } = makeSut()
    db.throwable.shouldThrow = true
    db.throwable.once = true
    const result = await sut.usingConnection(db, todo, true)
    expect(db.isConnected).toBe(false)
    expect(result).toBeNull()
  })

  it('should return null and disconnect if todo throws', async () => {
    const { sut, db, todo } = makeSut()
    db.isConnected = true
    todo.throwable.shouldThrow = true
    const result = await sut.usingConnection(db, todo, true)
    expect(db.isConnected).toBe(false)
    expect(result).toBeNull()
  })

  it('should return expected value', async () => {
    const { sut, db, todo, expected } = makeSut()
    const result = await sut.usingConnection(db, todo)
    expect(result).toEqual(expected)
  })
})

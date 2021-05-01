import { UsingTransaction } from '@/contracts'
import { mockCreated } from '../__mocks__'
import { IDatabaseTransactionSpy, IToDoSpy } from '../__spys__'

describe('UsingTransaction', () => {
  function makeSut() {
    const expected = mockCreated
    return {
      db: new IDatabaseTransactionSpy(),
      todo: new IToDoSpy(expected),
      sut: new UsingTransaction(),
      expected,
    }
  }

  it('should not be in transaction', async () => {
    const { sut, db, todo } = makeSut()
    await sut.usingTransaction(db, todo)
    expect(db.inTransaction).toBe(false)
  })

  it('should return null and not be in transaction if db throws', async () => {
    const { sut, db, todo } = makeSut()
    db.throwable.shouldThrow = true
    await sut.usingTransaction(db, todo)
    expect(db.inTransaction).toBe(false)
  })

  it('should return null and not be in transaction if todo throws', async () => {
    const { sut, db, todo } = makeSut()
    todo.throwable.shouldThrow = true
    await sut.usingTransaction(db, todo)
    expect(db.inTransaction).toBe(false)
  })

  it('should return null if db throws', async () => {
    const { sut, db, todo } = makeSut()
    db.throwable.shouldThrow = true
    const result = await sut.usingTransaction(db, todo)
    expect(result).toBeNull()
  })

  it('should return null if todo throws', async () => {
    const { sut, db, todo } = makeSut()
    todo.throwable.shouldThrow = true
    const result = await sut.usingTransaction(db, todo)
    expect(result).toBeNull()
  })

  it('should data be initial data if todo throws', async () => {
    const { sut, db, todo } = makeSut()
    todo.throwable.shouldThrow = true
    await sut.usingTransaction(db, todo)
    expect(db.data).toBe(db.initialData)
  })

  it('should return expected value', async () => {
    const { sut, db, todo, expected } = makeSut()
    const result = await sut.usingTransaction(db, todo)
    expect(result).toEqual(expected)
  })
})

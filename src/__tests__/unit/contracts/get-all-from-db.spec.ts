import { GetAllFromDb } from '@/contracts'
import { collectionNameMock, mockCreated } from '../__mocks__'
import { IDatabaseGetAllSpy } from '../__spys__'

describe('GetAllFromDb', () => {
  function makeSut() {
    const collectionName = collectionNameMock
    const foo = mockCreated
    const expected = [foo]
    return {
      sut: new GetAllFromDb(),
      collectionName,
      db: new IDatabaseGetAllSpy(expected),
      expected,
    }
  }

  describe('IDatabaseGetAll', () => {
    it('should be called with right values', async () => {
      const { sut, collectionName, db } = makeSut()
      await sut.getAll(collectionName, db)
      expect(db.collectionName).toBe(collectionName)
    })

    it('should sut throw if throws', async () => {
      const { sut, collectionName, db } = makeSut()
      db.throwable.shouldThrow = true
      await expect(sut.getAll(collectionName, db)).rejects.toThrowError()
    })

    it('should sut return null if returns null', async () => {
      const { sut, collectionName, db } = makeSut()
      db.shouldReturnNull = true
      const result = await sut.getAll(collectionName, db)
      expect(result).toBeNull()
    })
  })

  it('should result be equal expected', async () => {
    const { sut, collectionName, db, expected } = makeSut()
    const result = await sut.getAll(collectionName, db)
    expect(result).toEqual(expected)
  })
})

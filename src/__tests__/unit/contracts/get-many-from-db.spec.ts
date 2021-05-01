import { GetManyFromDb } from '@/contracts'
import { collectionNameMock, mockCreated } from '../__mocks__'
import { IDatabaseGetManySpy } from '../__spys__'

describe('GetManyFromDb', () => {
  function makeSut() {
    const collectionName = collectionNameMock
    const foo = mockCreated
    const by: keyof typeof foo = 'foo'
    const matching = foo[by]
    const expected = [foo]
    return {
      sut: new GetManyFromDb(),
      collectionName,
      db: new IDatabaseGetManySpy(expected),
      by,
      matching,
      expected,
    }
  }

  describe('IDatabaseGetMany', () => {
    it('should be called with right values', async () => {
      const { sut, collectionName, db, by, matching } = makeSut()
      await sut.getMany(collectionName, db, by, matching)
      expect(db.collectionName).toBe(collectionName)
      expect(db.by).toBe(by)
      expect(db.matching).toBe(matching)
    })

    it('should sut throw if throws', async () => {
      const { sut, collectionName, db, by, matching } = makeSut()
      db.throwable.shouldThrow = true
      await expect(
        sut.getMany(collectionName, db, by, matching),
      ).rejects.toThrowError()
    })

    it('should sut return null if returns null', async () => {
      const { sut, collectionName, db, by, matching } = makeSut()
      db.shouldReturnNull = true
      const result = await sut.getMany(collectionName, db, by, matching)
      expect(result).toBeNull()
    })
  })

  it('should result be equal expected', async () => {
    const { sut, collectionName, db, by, matching, expected } = makeSut()
    const result = await sut.getMany(collectionName, db, by, matching)
    expect(result).toEqual(expected)
  })
})

import { DeleteOneInDb } from '@/contracts'
import { collectionNameMock, mockCreated } from '../__mocks__'
import { IDatabaseDeleteOneSpy } from '../__spys__'

describe('DeleteOneInDb', () => {
  function makeSut() {
    const collectionName = collectionNameMock
    const expected = mockCreated
    const by: keyof typeof expected = 'foo'
    const matching = expected[by]
    return {
      sut: new DeleteOneInDb(),
      collectionName,
      db: new IDatabaseDeleteOneSpy(expected),
      by,
      matching,
      expected,
    }
  }

  describe('IDatabaseDeleteOne', () => {
    it('should be called with right values', async () => {
      const { sut, collectionName, db, by, matching } = makeSut()
      await sut.deleteOne(collectionName, db, by, matching)
      expect(db.collectionName).toBe(collectionName)
      expect(db.by).toBe(by)
      expect(db.matching).toBe(matching)
    })

    it('should sut throw if throws', async () => {
      const { sut, collectionName, db, by, matching } = makeSut()
      db.throwable.shouldThrow = true
      await expect(
        sut.deleteOne(collectionName, db, by, matching),
      ).rejects.toThrowError()
    })

    it('should sut return null if returns null', async () => {
      const { sut, collectionName, db, by, matching } = makeSut()
      db.shouldReturnNull = true
      const result = await sut.deleteOne(collectionName, db, by, matching)
      expect(result).toBeNull()
    })
  })

  it('should result be equal expected', async () => {
    const { sut, collectionName, db, by, matching, expected } = makeSut()
    const result = await sut.deleteOne(collectionName, db, by, matching)
    expect(result).toEqual(expected)
  })
})

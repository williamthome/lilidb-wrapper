import { UpdateOneInDb } from '@/contracts'
import {
  collectionNameMock,
  mockCreated,
  mockForUpdate,
  mockUpdated,
} from '../__mocks__'
import { IDatabaseUpdateOneSpy, IValidatorSpy } from '../__spys__'

describe('UpdateOneInDb', () => {
  function makeSut() {
    const collectionName = collectionNameMock
    const originalState = mockCreated
    const by: keyof typeof originalState = 'foo'
    const matching = originalState[by]
    const as = mockForUpdate
    const updated = mockUpdated
    return {
      sut: new UpdateOneInDb(),
      collectionName,
      validator: new IValidatorSpy(),
      db: new IDatabaseUpdateOneSpy(originalState),
      by,
      matching,
      as,
      updated,
      originalState,
    }
  }

  describe('IValidator', () => {
    it('should be called with right values', async () => {
      const { sut, collectionName, validator, db, by, matching, as } = makeSut()
      await sut.updateOne(collectionName, validator, db, by, matching, as)
      expect(validator.toValidate).toEqual(as)
    })

    it('should sut throw if throws', async () => {
      const { sut, collectionName, validator, db, by, matching, as } = makeSut()
      validator.throwable.shouldThrow = true
      await expect(
        sut.updateOne(collectionName, validator, db, by, matching, as),
      ).rejects.toThrowError()
    })
  })

  describe('IDatabaseUpdateOne', () => {
    it('should be called with right values', async () => {
      const { sut, collectionName, validator, db, by, matching, as } = makeSut()
      await sut.updateOne(collectionName, validator, db, by, matching, as)
      expect(db.collectionName).toBe(collectionName)
      expect(db.by).toBe(by)
      expect(db.matching).toBe(matching)
      expect(db.as).toEqual(as)
    })

    it('should sut throw if throws', async () => {
      const { sut, collectionName, validator, db, by, matching, as } = makeSut()
      db.throwable.shouldThrow = true
      await expect(
        sut.updateOne(collectionName, validator, db, by, matching, as),
      ).rejects.toThrowError()
    })

    it('should sut return null if returns null', async () => {
      const { sut, collectionName, validator, db, by, matching, as } = makeSut()
      db.shouldReturnNull = true
      const result = await sut.updateOne(
        collectionName,
        validator,
        db,
        by,
        matching,
        as,
      )
      expect(result).toBeNull()
    })
  })

  it('should result be equal updated', async () => {
    const {
      sut,
      collectionName,
      validator,
      db,
      by,
      matching,
      as,
      updated,
    } = makeSut()
    const result = await sut.updateOne(
      collectionName,
      validator,
      db,
      by,
      matching,
      as,
    )
    expect(result).toEqual(updated)
  })
})

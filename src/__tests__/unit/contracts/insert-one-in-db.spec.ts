import { InsertOneInDb } from '@/contracts'
import { collectionNameMock, mockForCreate, mockCreated } from '../__mocks__'
import { IDatabaseInsertOneSpy, IParserSpy, IValidatorSpy } from '../__spys__'

describe('InsertOneInDb', () => {
  function makeSut() {
    const collectionName = collectionNameMock
    const forCreate = mockForCreate
    const created = mockCreated
    return {
      sut: new InsertOneInDb(),
      collectionName,
      validator: new IValidatorSpy(),
      db: new IDatabaseInsertOneSpy(),
      parser: new IParserSpy(created),
      forCreate,
      created,
    }
  }

  describe('IValidator', () => {
    it('should be called with right values', async () => {
      const {
        sut,
        collectionName,
        validator,
        db,
        parser,
        forCreate,
      } = makeSut()
      await sut.insertOne(collectionName, validator, db, parser, forCreate)
      expect(validator.toValidate).toEqual(forCreate)
    })

    it('should sut throw if throws', async () => {
      const {
        sut,
        collectionName,
        validator,
        db,
        parser,
        forCreate,
      } = makeSut()
      validator.throwable.shouldThrow = true
      await expect(
        sut.insertOne(collectionName, validator, db, parser, forCreate),
      ).rejects.toThrowError()
    })
  })

  describe('IParser', () => {
    it('should be called with right values', async () => {
      const {
        sut,
        collectionName,
        validator,
        db,
        parser,
        forCreate,
        created,
      } = makeSut()
      await sut.insertOne(collectionName, validator, db, parser, forCreate)
      expect(parser.toParse).toEqual(forCreate)
      expect(parser.parsed).toEqual(created)
    })

    it('should sut throw if throws', async () => {
      const {
        sut,
        collectionName,
        validator,
        db,
        parser,
        forCreate,
      } = makeSut()
      parser.throwable.shouldThrow = true
      await expect(
        sut.insertOne(collectionName, validator, db, parser, forCreate),
      ).rejects.toThrowError()
    })
  })

  describe('IDatabaseInsertOne', () => {
    it('should be called with right values', async () => {
      const {
        sut,
        collectionName,
        validator,
        db,
        parser,
        forCreate,
        created,
      } = makeSut()
      await sut.insertOne(collectionName, validator, db, parser, forCreate)
      expect(db.collectionName).toBe(collectionName)
      expect(db.obj).toEqual(created)
    })

    it('should sut throw if throws', async () => {
      const {
        sut,
        collectionName,
        validator,
        db,
        parser,
        forCreate,
      } = makeSut()
      db.throwable.shouldThrow = true
      await expect(
        sut.insertOne(collectionName, validator, db, parser, forCreate),
      ).rejects.toThrowError()
    })
  })

  it('should result be equal created', async () => {
    const {
      sut,
      collectionName,
      validator,
      db,
      parser,
      forCreate,
      created,
    } = makeSut()
    const result = await sut.insertOne(
      collectionName,
      validator,
      db,
      parser,
      forCreate,
    )
    expect(result).toEqual(created)
  })
})

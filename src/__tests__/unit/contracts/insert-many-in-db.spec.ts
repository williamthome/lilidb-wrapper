import { InsertManyInDb } from '@/contracts'
import { collectionNameMock, mockForCreate, mockCreated } from '../__mocks__'
import { IDatabaseInsertManySpy, IParserSpy, IValidatorSpy } from '../__spys__'

describe('InsertManyInDb', () => {
  function makeSut() {
    const collectionName = collectionNameMock
    const forCreate = [mockForCreate]
    const created = [mockCreated]
    return {
      sut: new InsertManyInDb(),
      collectionName,
      validator: new IValidatorSpy(),
      db: new IDatabaseInsertManySpy(),
      parser: new IParserSpy(mockCreated),
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
      await sut.insertMany(collectionName, validator, db, parser, ...forCreate)
      const lastForCreate = forCreate[forCreate.length - 1]
      expect(validator.toValidate).toEqual(lastForCreate)
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
        sut.insertMany(collectionName, validator, db, parser, ...forCreate),
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
      await sut.insertMany(collectionName, validator, db, parser, ...forCreate)
      const lastParsed = forCreate[forCreate.length - 1]
      const lastCreated = created[created.length - 1]
      expect(parser.toParse).toEqual(lastParsed)
      expect(parser.parsed).toEqual(lastCreated)
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
        sut.insertMany(collectionName, validator, db, parser, ...forCreate),
      ).rejects.toThrowError()
    })
  })

  describe('IDatabaseInsertMany', () => {
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
      await sut.insertMany(collectionName, validator, db, parser, ...forCreate)
      expect(db.collectionName).toBe(collectionName)
      expect(db.objs).toEqual(created)
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
        sut.insertMany(collectionName, validator, db, parser, ...forCreate),
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
    const result = await sut.insertMany(
      collectionName,
      validator,
      db,
      parser,
      ...forCreate,
    )
    expect(result).toEqual(created)
  })
})

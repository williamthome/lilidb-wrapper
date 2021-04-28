import { SchemaCollection } from '@/collection'
import { UsingConnection, UsingTransaction } from '@/collection/contracts'
import { MapDatabase } from '@/database/models'
import {
  privateString,
  requiredSchema,
  requiredString,
} from '@williamthome/lilischema'

const makeSut = () => {
  const schema = requiredSchema({
    id: privateString(),
    foo: requiredString({ mustBe: ['foo', 'bar'] }),
  })

  const sut = new SchemaCollection<
    typeof schema['schemas'],
    typeof schema['validationType'],
    typeof schema
  >('foo', schema, {
    parse: async (payload) => ({
      id: (Math.random() * 999).toString(),
      ...payload,
    }),
  })

  const db = new MapDatabase()
  const { usingTransaction } = new UsingTransaction()
  const { usingConnection } = new UsingConnection()

  return { sut, db, usingTransaction, usingConnection }
}

describe('SchemaCollection', () => {
  it('should insert one', async () => {
    const { sut, db } = makeSut()
    await sut.insertOne(db, { foo: 'foo' })
    const foo = await sut.getOne(db, 'foo', 'foo')
    expect(foo).toMatchObject({ foo: 'foo' })
  })

  it('should delete one', async () => {
    const { sut, db } = makeSut()
    await sut.insertOne(db, { foo: 'foo' })
    await sut.deleteOne(db, 'foo', 'foo')
    const foo = await sut.getOne(db, 'foo', 'foo')
    expect(foo).toBeNull()
  })

  it('should update one', async () => {
    const { sut, db } = makeSut()
    await sut.insertOne(db, { foo: 'foo' })
    await sut.updateOne(db, 'foo', 'foo', {
      foo: 'bar',
    })
    const foo = await sut.getOne(db, 'foo', 'bar')
    expect(foo).toMatchObject({ foo: 'bar' })
  })

  it('should rollback', async () => {
    const { sut, db, usingTransaction } = makeSut()

    const foo = { foo: 'foo' }

    const updatedFoo = await usingTransaction(db, async () => {
      await sut.insertOne(db, foo)
      await sut.updateOne(db, 'foo', foo.foo, {
        foo: 'bar',
      })
      throw new Error()
    })
    expect(updatedFoo).toBeNull()

    const foundedFoo = await sut.getOne(db, 'foo', foo.foo)
    expect(foundedFoo).toBeNull()
  })

  it('should commit', async () => {
    const { sut, db, usingTransaction } = makeSut()
    const updatedFoo = await usingTransaction(db, async () => {
      await sut.insertOne(db, { foo: 'foo' })
      return await sut.updateOne(db, 'foo', 'foo', { foo: 'bar' })
    })
    expect(updatedFoo).toMatchObject({ foo: 'bar' })
  })

  it('should get all', async () => {
    const { sut, db } = makeSut()
    await sut.insertOne(db, { foo: 'foo' })
    await sut.insertOne(db, { foo: 'bar' })
    const foos = await sut.getAll(db)
    expect(foos?.length).toBe(2)
  })

  it('should get many', async () => {
    const { sut, db } = makeSut()
    await sut.insertOne(db, { foo: 'foo' })
    await sut.insertOne(db, { foo: 'foo' })
    const foos = await sut.getMany(db, 'foo', 'foo')
    expect(foos?.length).toBe(2)
  })

  it('should return validate error on insert', async () => {
    const { sut, db } = makeSut()
    const foo = await sut.insertOne(db, { foo: 'invalid' })
    expect((foo as Error).message).not.toBeUndefined()
  })

  it('should return validate error on update', async () => {
    const { sut, db } = makeSut()
    await sut.insertOne(db, { foo: 'foo' })
    const foo = await sut.updateOne(db, 'foo', 'foo', { foo: 'invalid' })
    expect((foo as Error).message).not.toBeUndefined()
  })

  it('should connect', async () => {
    const { db, usingConnection } = makeSut()
    await usingConnection(db, async () => undefined)
    expect(db.isConnected).toBe(true)
  })

  it('should disconnect', async () => {
    const { db, usingConnection } = makeSut()
    await usingConnection(db, async () => undefined, true)
    expect(db.isConnected).toBe(false)
  })

  it('should return null and stay connected if connection throws', async () => {
    const { db, usingConnection } = makeSut()
    const result = await usingConnection(db, async () => {
      throw new Error()
    })
    expect(db.isConnected).toBe(true)
    expect(result).toBeNull()
  })

  it('should return null and disconnect if connection throws', async () => {
    const { db, usingConnection } = makeSut()
    const result = await usingConnection(
      db,
      async () => {
        throw new Error()
      },
      true,
    )
    expect(db.isConnected).toBe(false)
    expect(result).toBeNull()
  })
})

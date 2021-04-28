import { SchemaCollection } from '@/collection'
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

  return { sut, db }
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
})

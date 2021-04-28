import {
  MapDatabase,
  SchemaCollection,
  UsingConnection,
  UsingTransaction,
} from '@williamthome/lilidb-wrapper'
import {
  privateString,
  requiredSchema,
  requiredString,
} from '@williamthome/lilischema'

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

async function test(): Promise<void> {
  const createdFoo = await sut.insertOne(db, { foo: 'foo' })
  console.log({ createdFoo })

  const foundedFoo = await sut.getOne(db, 'foo', 'foo')
  console.log({ foundedFoo })

  const updatedFoo = await sut.updateOne(db, 'foo', 'foo', { foo: 'bar' })
  console.log({ updatedFoo })

  const validationError = await usingConnection(db, async () => {
    return await usingTransaction(db, async () => {
      return await sut.updateOne(db, 'foo', 'foo', { foo: 'invalid' })
    })
  })
  console.log({ validationError })

  console.log({ isConnected: db.isConnected })
  await usingConnection(db, async () => undefined, true)
  console.log({ isConnected: db.isConnected })
}

test()

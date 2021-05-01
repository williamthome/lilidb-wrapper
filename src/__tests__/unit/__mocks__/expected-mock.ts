export interface Foo {
  id: number
  foo: string
}

export interface Bar {
  id: number
  bar: string
}

export const mockForCreate: Omit<Foo, 'id'> = { foo: 'foo' }

export const mockCreated: Foo = { id: 0, foo: mockForCreate.foo }

export const mockForUpdate: Partial<Foo> = { foo: 'bar' }

export const mockUpdated: Partial<Foo> = { id: mockCreated.id, foo: 'bar' }

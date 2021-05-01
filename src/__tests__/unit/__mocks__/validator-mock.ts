import type { IValidator } from '@/protocols/crud'
import type { Foo } from './expected-mock'

export const fooValidator: IValidator<Error> = {
  validate: async (toValidate) => {
    const foo = (toValidate as Foo).foo
    if (foo === 'foo' || foo === 'bar') return
    return new Error('Value of foo field must be foo or bar')
  },
}

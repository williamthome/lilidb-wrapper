import type { IValidator } from '@/protocols/crud'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IValidatorSpy extends Spy implements IValidator<Error> {
  shouldReturnValid = true

  toValidate?: unknown

  async validate(toValidate?: unknown): Promise<void | Error> {
    this.toValidate = toValidate

    this.throwErrorIfShouldThrow()

    if (!this.shouldReturnValid) return new Error()
  }
}

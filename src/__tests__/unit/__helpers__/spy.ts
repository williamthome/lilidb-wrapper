interface IThrowableSpy {
  shouldThrow: boolean
  once: boolean
  error: Error | undefined
}

export class Spy {
  throwable: IThrowableSpy = {
    shouldThrow: false,
    once: true,
    error: undefined,
  }

  throwErrorIfShouldThrow(
    opts: { onSuccess?: () => void; onError?: (error: Error) => void } = {},
  ): void | never {
    const { throwable } = this
    const { shouldThrow, once } = throwable
    const { onSuccess, onError } = opts

    if (shouldThrow) {
      throwable.error = new Error()
      if (onError) onError(throwable.error)
      if (once) throwable.shouldThrow = false
      throw throwable.error
    } else {
      throwable.error = undefined
      if (onSuccess) onSuccess()
    }
  }
}

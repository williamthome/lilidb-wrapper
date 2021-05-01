import type { IToDo } from '@/protocols/crud'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IToDoSpy<TExpected> extends Spy implements IToDo<TExpected> {
  constructor(readonly expected: TExpected) {
    super()
  }

  async doThis(): Promise<TExpected> {
    this.throwErrorIfShouldThrow()
    return this.expected
  }
}

import type { IParser } from '@/protocols/crud'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IParserSpy extends Spy implements IParser<unknown, unknown> {
  toParse?: unknown

  constructor(readonly parsed: unknown) {
    super()
  }

  async parse(toParse: unknown): Promise<unknown> {
    this.toParse = toParse

    this.throwErrorIfShouldThrow()

    return this.parsed
  }
}

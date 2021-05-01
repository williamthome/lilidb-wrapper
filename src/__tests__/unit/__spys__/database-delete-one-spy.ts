import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionTypes,
} from '@/types'
import type { IDatabaseDeleteOne } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseDeleteOneSpy<TCollection extends Collections<unknown>>
  extends Spy
  implements IDatabaseDeleteOne<TCollection> {
  result?: null | unknown
  shouldReturnNull = false

  collectionName?: string
  by?: string
  matching?: unknown

  constructor(readonly expected: ExtractCollectionTypes<TCollection>) {
    super()
  }

  async deleteOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
  ): Promise<TExpected | null> {
    this.collectionName = collectionName
    this.by = by
    this.matching = matching

    this.throwErrorIfShouldThrow()

    this.result = this.shouldReturnNull ? null : this.expected

    return this.result as TExpected | null
  }
}

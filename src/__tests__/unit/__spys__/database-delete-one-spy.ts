import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionTypes,
} from '@/types'
import type { IDatabaseDeleteOne } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseDeleteOneSpy<TCollections extends Collections>
  extends Spy
  implements IDatabaseDeleteOne<TCollections> {
  result?: null | unknown
  shouldReturnNull = false

  collectionName?: string
  by?: string
  matching?: unknown

  constructor(readonly expected: ExtractCollectionTypes<TCollections>) {
    super()
  }

  async deleteOne<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
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

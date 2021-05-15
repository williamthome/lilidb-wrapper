import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionTypes,
} from '@/types'
import type { IDatabaseGetOne } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseGetOneSpy<TCollections extends Collections>
  extends Spy
  implements IDatabaseGetOne<TCollections> {
  result?: null | unknown
  shouldReturnNull = false

  collectionName?: string
  by?: string
  matching?: unknown

  constructor(readonly expected: ExtractCollectionTypes<TCollections>) {
    super()
  }

  async getOne<
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

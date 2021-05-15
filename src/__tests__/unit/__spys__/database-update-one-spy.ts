import type { KeyValueOf, StringKeyOf } from '@/types/helpers'
import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionTypes,
  ExtractCollectionUpdateTypeByName,
} from '@/types'
import type { IDatabaseUpdateOne } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseUpdateOneSpy<TCollections extends Collections>
  extends Spy
  implements IDatabaseUpdateOne<TCollections> {
  result?: null | unknown
  shouldReturnNull = false

  collectionName?: string
  by?: string
  matching?: unknown
  as?: unknown

  constructor(readonly originalState: ExtractCollectionTypes<TCollections>) {
    super()
  }

  async updateOne<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<
      TCollections,
      TCollectionName
    >,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>,
    TForUpdate extends ExtractCollectionUpdateTypeByName<
      TCollections,
      TCollectionName
    >
  >(
    collectionName: TCollectionName,
    by: TBy,
    matching: TMatching,
    as: TForUpdate,
  ): Promise<TExpected | null> {
    this.collectionName = collectionName
    this.by = by
    this.matching = matching
    this.as = as

    this.throwErrorIfShouldThrow()

    this.result = this.shouldReturnNull
      ? null
      : Object.assign({}, this.originalState, as)

    return this.result as TExpected | null
  }
}

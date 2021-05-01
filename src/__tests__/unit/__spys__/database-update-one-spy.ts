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

export class IDatabaseUpdateOneSpy<TCollection extends Collections<unknown>>
  extends Spy
  implements IDatabaseUpdateOne<TCollection> {
  result?: null | unknown
  shouldReturnNull = false

  collectionName?: string
  by?: string
  matching?: unknown
  as?: unknown

  constructor(readonly originalState: ExtractCollectionTypes<TCollection>) {
    super()
  }

  async updateOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>,
    TBy extends StringKeyOf<TExpected>,
    TMatching extends KeyValueOf<TExpected, TBy>,
    TForUpdate extends ExtractCollectionUpdateTypeByName<
      TCollection,
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
      : { ...Object(this.originalState), ...Object(as) }

    return this.result as TExpected | null
  }
}

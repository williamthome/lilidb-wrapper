import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionTypes,
} from '@/types'
import type { IDatabaseGetAll } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseGetAllSpy<TCollection extends Collections<unknown>>
  extends Spy
  implements IDatabaseGetAll<TCollection> {
  result?: null | unknown[]
  shouldReturnNull = false

  collectionName?: string

  constructor(readonly expected: ExtractCollectionTypes<TCollection>[]) {
    super()
  }

  async getAll<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(collectionName: TCollectionName): Promise<TExpected[] | null> {
    this.collectionName = collectionName

    this.throwErrorIfShouldThrow()

    this.result = this.shouldReturnNull ? null : this.expected

    return this.result as TExpected[] | null
  }
}

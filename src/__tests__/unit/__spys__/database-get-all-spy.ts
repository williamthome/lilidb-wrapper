import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
  ExtractCollectionTypes,
} from '@/types'
import type { IDatabaseGetAll } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseGetAllSpy<TCollections extends Collections>
  extends Spy
  implements IDatabaseGetAll<TCollections> {
  result?: null | unknown[]
  shouldReturnNull = false

  collectionName?: string

  constructor(readonly expected: ExtractCollectionTypes<TCollections>[]) {
    super()
  }

  async getAll<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(collectionName: TCollectionName): Promise<TExpected[] | null> {
    this.collectionName = collectionName

    this.throwErrorIfShouldThrow()

    this.result = this.shouldReturnNull ? null : this.expected

    return this.result as TExpected[] | null
  }
}

import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertOne } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseInsertOneSpy<TCollections extends Collections>
  extends Spy
  implements IDatabaseInsertOne<TCollections> {
  result?: null | unknown
  shouldReturnNull = false

  collectionName?: string
  obj?: unknown

  async insertOne<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
  >(
    collectionName: TCollectionName,
    obj: TExpected,
  ): Promise<TExpected | null> {
    this.collectionName = collectionName
    this.obj = obj

    this.throwErrorIfShouldThrow()

    this.result = this.shouldReturnNull ? null : obj

    return this.result as TExpected | null
  }
}

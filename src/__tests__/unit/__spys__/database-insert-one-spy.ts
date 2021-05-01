import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertOne } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseInsertOneSpy<TCollection extends Collections<unknown>>
  extends Spy
  implements IDatabaseInsertOne<TCollection> {
  result?: null | unknown
  shouldReturnNull = false

  collectionName?: string
  obj?: unknown

  async insertOne<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
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

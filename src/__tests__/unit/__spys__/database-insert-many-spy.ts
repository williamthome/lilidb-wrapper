import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertMany } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseInsertManySpy<TCollection extends Collections<unknown>>
  extends Spy
  implements IDatabaseInsertMany<TCollection> {
  result?: null | unknown[]
  shouldReturnNull = false

  collectionName?: string
  objs?: unknown[]

  async insertMany<
    TCollectionName extends ExtractCollectionNames<TCollection>,
    TExpected extends ExtractCollectionTypeByName<TCollection, TCollectionName>
  >(
    collectionName: TCollectionName,
    ...objs: TExpected[]
  ): Promise<TExpected[] | null> {
    this.collectionName = collectionName
    this.objs = objs

    this.throwErrorIfShouldThrow()

    this.result = this.shouldReturnNull ? null : objs

    return this.result as TExpected[] | null
  }
}

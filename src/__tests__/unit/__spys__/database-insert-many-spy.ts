import type {
  Collections,
  ExtractCollectionNames,
  ExtractCollectionTypeByName,
} from '@/types'
import type { IDatabaseInsertMany } from '@/protocols'
import { Spy } from '@/__tests__/unit/__helpers__'

export class IDatabaseInsertManySpy<TCollections extends Collections>
  extends Spy
  implements IDatabaseInsertMany<TCollections> {
  result?: null | unknown[]
  shouldReturnNull = false

  collectionName?: string
  objs?: unknown[]

  async insertMany<
    TCollectionName extends ExtractCollectionNames<TCollections>,
    TExpected extends ExtractCollectionTypeByName<TCollections, TCollectionName>
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

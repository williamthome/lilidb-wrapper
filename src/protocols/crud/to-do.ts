export interface IToDo<TExpected> {
  doThis: () => Promise<TExpected>
}

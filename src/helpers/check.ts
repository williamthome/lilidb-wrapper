export function isFalsy(...objs: unknown[]): boolean {
  return objs.some((obj) => obj === undefined || obj === null)
}

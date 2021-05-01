/* eslint-disable @typescript-eslint/no-explicit-any */
export type KeyValueOf<T, Key> = T extends Record<any, any>
  ? Key extends keyof T
    ? T[Key]
    : unknown
  : unknown

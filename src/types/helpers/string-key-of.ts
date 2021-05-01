/* eslint-disable @typescript-eslint/no-explicit-any */
export type StringKeyOf<T> = T extends Record<any, any>
  ? keyof T & string
  : string

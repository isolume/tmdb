/**
 * A utility type to convert a snake_case string to camelCase.
 * e.g., 'hello_world' -> 'helloWorld'
 */
type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

/**
 * Recursively converts all keys of an object or an array of objects
 * from snake_case to camelCase.
 */
export type CamelCase<T> = T extends ReadonlyArray<infer E>
  ? Array<CamelCase<E>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : T extends Date | RegExp | ((...args: any[]) => any)
  ? T
  : T extends object
  ? T extends null
    ? T
    : {
        [K in keyof T as SnakeToCamelCase<K & string>]: CamelCase<T[K]>;
      }
  : T;

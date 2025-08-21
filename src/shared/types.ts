type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

export type CamelCase<T> =
  T extends ReadonlyArray<infer E>
    ? Array<CamelCase<E>>
    : T extends Date | RegExp | ((...args: any[]) => any)
      ? T
      : T extends object
        ? T extends null
          ? T
          : {
              [K in keyof T as SnakeToCamelCase<K & string>]: CamelCase<T[K]>;
            }
        : T;

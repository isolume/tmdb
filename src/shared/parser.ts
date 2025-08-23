/**
 * @internal
 */
function snakeToCamel(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
}

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toCamelCase<T>(obj: any): T {
  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return obj.map((v) => toCamelCase(v)) as any;
  } else if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = snakeToCamel(key);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (obj as any)[key];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc as any)[camelKey] = toCamelCase(value);

      return acc;
    }, {} as T);
  }
  return obj as T;
}

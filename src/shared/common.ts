/**
 * Extracts the `results` array type from a TMDB paged response shape.
 * Useful when you have a raw OpenAPI response and want the item type.
 *
 * @example
 * type Raw = paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];
 * type MovieItem = ResultItem<Raw>; // item inside Raw.results[]
 *
 * @internal
 */
export type ResultsArray<T extends { results?: unknown }> =
  NonNullable<T["results"]> extends infer R ? (R extends unknown[] ? R : never) : never;

/** A single item inside a `results` array of a paged response.
 *
 * @internal
 */
export type ResultItem<T extends { results?: unknown }> = ResultsArray<T>[number];

/**
 * Standard TMDB paged envelope.
 * Keep this generic minimal & stable to avoid noisy IntelliSense expansions.
 *
 * @internal
 */
export interface Paged<T> {
  /** Current page number (1-based). */
  page: number;
  /** Items for the current page. */
  results: T[];
  /** Total number of pages available. */
  total_pages: number;
  /** Total number of results across all pages. */
  total_results: number;
}

/**
 * Paged envelope that also includes a date window (used by some list endpoints).
 * Only use when the endpoint actually returns `dates`.
 *
 * @internal
 */
export interface PagedWithDates<T> extends Paged<T> {
  dates: { minimum: string; maximum: string };
}

export interface TMDBOptions {
  apiKey: string;
  language?: string;
  region?: string;
  baseUrl?: string;
  timeout?: number;
}

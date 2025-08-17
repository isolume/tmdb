import type { paths } from './tmdb';

export type ResultsArray<T extends { results?: unknown }> =
  NonNullable<T['results']> extends infer R ? (R extends unknown[] ? R : never) : never;

export type ResultItem<T extends { results?: unknown }> = ResultsArray<T>[number];

type _SearchMoviePaged =
  paths['/3/search/movie']['get']['responses']['200']['content']['application/json'];
export type Paged<T> = Omit<_SearchMoviePaged, 'results'> & { results: T[] };


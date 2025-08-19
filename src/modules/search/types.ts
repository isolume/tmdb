import type { paths } from "../../generated/tmdb";
import type { ResultItem, Paged } from "../../shared/common";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

// Raw OpenAPI response types (internal)
/** @internal */
type _MovieSearchResponse =
  paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _TvSearchResponse =
  paths["/3/search/tv"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _PersonSearchResponse =
  paths["/3/search/person"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _MultiSearchResponse =
  paths["/3/search/multi"]["get"]["responses"]["200"]["content"]["application/json"];

// OpenAPI query parameter types (canonical source of truth)
/** Complete query parameters for movie search endpoint. */
export type SearchMovieQuery = paths["/3/search/movie"]["get"]["parameters"]["query"];
/** Complete query parameters for TV search endpoint. */
export type SearchTvQuery = paths["/3/search/tv"]["get"]["parameters"]["query"];
/** Complete query parameters for person search endpoint. */
export type SearchPersonQuery = paths["/3/search/person"]["get"]["parameters"]["query"];
/** Complete query parameters for multi-search endpoint. */
export type MultiSearchQuery = paths["/3/search/multi"]["get"]["parameters"]["query"];

// Derived option types for public API (excluding required query parameter)
/** Optional parameters for movie search. */
export type MovieSearchOptions = Prettify<Omit<SearchMovieQuery, "query">>;
/** Optional parameters for TV search. */
export type TvSearchOptions = Prettify<Omit<SearchTvQuery, "query">>;
/** Optional parameters for person search. */
export type PersonSearchOptions = Prettify<Omit<SearchPersonQuery, "query">>;
/** Optional parameters for multi-search. */
export type MultiSearchOptions = Prettify<Omit<MultiSearchQuery, "query">>;

// Individual result types
/** A single movie item from search results. */
export type SearchMovie = ResultItem<_MovieSearchResponse>;
/** A single TV show item from search results. */
export type SearchTv = ResultItem<_TvSearchResponse>;
/** A single person item from search results. */
export type SearchPerson = ResultItem<_PersonSearchResponse>;
/** A single multi-search result item (movie | tv | person). */
export type MultiSearchResult = ResultItem<_MultiSearchResponse>;

// Response types
/** Paged list of movies returned by movie search. */
export interface SearchMovieResponse extends Paged<SearchMovie> {}
/** Paged list of TV shows returned by TV search. */
export interface SearchTvResponse extends Paged<SearchTv> {}
/** Paged list of people returned by person search. */
export interface SearchPersonResponse extends Paged<SearchPerson> {}
/** Paged mixed results returned by multi-search. */
export interface MultiSearchResponse extends Paged<MultiSearchResult> {}

// Multi-search discriminated union types
/** Movie variant of multi-search result. */
export type MultiSearchMovie = Extract<MultiSearchResult, { media_type: "movie" }>;
/** TV show variant of multi-search result. */
export type MultiSearchTv = Extract<MultiSearchResult, { media_type: "tv" }>;
/** Person variant of multi-search result. */
export type MultiSearchPerson = Extract<MultiSearchResult, { media_type: "person" }>;

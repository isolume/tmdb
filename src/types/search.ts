import type { paths } from "./tmdb";
import type { ResultItem } from "./common";

type _MovieSearchResponse =
  paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];
export type SearchMovie = ResultItem<_MovieSearchResponse>;

type _TvSearchResponse =
  paths["/3/search/tv"]["get"]["responses"]["200"]["content"]["application/json"];
export type SearchTv = ResultItem<_TvSearchResponse>;

type _PersonSearchResponse =
  paths["/3/search/person"]["get"]["responses"]["200"]["content"]["application/json"];
export type SearchPerson = ResultItem<_PersonSearchResponse>;

type _MultiSearchResponse =
  paths["/3/search/multi"]["get"]["responses"]["200"]["content"]["application/json"];
export type MultiSearchResult = ResultItem<_MultiSearchResponse>;

export type SearchMovieQuery  = paths["/3/search/movie"]["get"]["parameters"]["query"];
export type SearchTvQuery     = paths["/3/search/tv"]["get"]["parameters"]["query"];
export type SearchPersonQuery = paths["/3/search/person"]["get"]["parameters"]["query"];
export type MultiSearchQuery  = paths["/3/search/multi"]["get"]["parameters"]["query"];

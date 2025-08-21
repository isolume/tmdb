import type { paths } from "../../generated/tmdb";
import type { CamelCase } from "../../shared/types";

type MovieSearchResultsApiResponse =
  paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];
export type MovieSearchResults = CamelCase<MovieSearchResultsApiResponse>;

type TvSearchResultsApiResponse =
  paths["/3/search/tv"]["get"]["responses"]["200"]["content"]["application/json"];
export type TvSearchResults = CamelCase<TvSearchResultsApiResponse>;

type PeopleSearchResultsApiResponse =
  paths["/3/search/person"]["get"]["responses"]["200"]["content"]["application/json"];
export type PeopleSearchResults = CamelCase<PeopleSearchResultsApiResponse>;

type MultiSearchResultsApiResponse =
  paths["/3/search/multi"]["get"]["responses"]["200"]["content"]["application/json"];
export type MultiSearchResults = CamelCase<MultiSearchResultsApiResponse>;

export type MovieSearchResult = NonNullable<MovieSearchResults["results"]>[number];
export type TvSearchResult = NonNullable<TvSearchResults["results"]>[number];
export type PersonSearchResult = NonNullable<PeopleSearchResults["results"]>[number];
export type MultiSearchResult = NonNullable<MultiSearchResults["results"]>[number];

export type MultiSearchMovie = Extract<MultiSearchResult, { mediaType: "movie" }>;
export type MultiSearchTv = Extract<MultiSearchResult, { mediaType: "tv" }>;
export type MultiSearchPerson = Extract<MultiSearchResult, { mediaType: "person" }>;

type GetMovieSearchOptionsApiResponse = Omit<
  paths["/3/search/movie"]["get"]["parameters"]["query"],
  "query"
>;
export type GetMovieSearchOptions = CamelCase<GetMovieSearchOptionsApiResponse>;

type GetTvSearchOptionsApiResponse = Omit<
  paths["/3/search/tv"]["get"]["parameters"]["query"],
  "query"
>;
export type GetTvSearchOptions = CamelCase<GetTvSearchOptionsApiResponse>;

type GetPeopleSearchOptionsApiResponse = Omit<
  paths["/3/search/person"]["get"]["parameters"]["query"],
  "query"
>;
export type GetPeopleSearchOptions = CamelCase<GetPeopleSearchOptionsApiResponse>;

type GetMultiSearchOptionsApiResponse = Omit<
  paths["/3/search/multi"]["get"]["parameters"]["query"],
  "query"
>;
export type GetMultiSearchOptions = CamelCase<GetMultiSearchOptionsApiResponse>;

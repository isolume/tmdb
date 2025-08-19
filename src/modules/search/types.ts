import type { paths } from "../../generated/tmdb";

export type MovieSearchResults =
  paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export type TvSearchResults =
  paths["/3/search/tv"]["get"]["responses"]["200"]["content"]["application/json"];

export type PeopleSearchResults =
  paths["/3/search/person"]["get"]["responses"]["200"]["content"]["application/json"];

export type MultiSearchResults =
  paths["/3/search/multi"]["get"]["responses"]["200"]["content"]["application/json"];

export type MovieSearchResult = NonNullable<MovieSearchResults["results"]>[number];
export type TvSearchResult = NonNullable<TvSearchResults["results"]>[number];
export type PersonSearchResult = NonNullable<PeopleSearchResults["results"]>[number];
export type MultiSearchResult = NonNullable<MultiSearchResults["results"]>[number];

export type MultiSearchMovie = Extract<MultiSearchResult, { media_type: "movie" }>;
export type MultiSearchTv = Extract<MultiSearchResult, { media_type: "tv" }>;
export type MultiSearchPerson = Extract<MultiSearchResult, { media_type: "person" }>;

export type GetMovieSearchOptions = Omit<
  paths["/3/search/movie"]["get"]["parameters"]["query"],
  "query"
>;

export type GetTvSearchOptions = Omit<paths["/3/search/tv"]["get"]["parameters"]["query"], "query">;

export type GetPeopleSearchOptions = Omit<
  paths["/3/search/person"]["get"]["parameters"]["query"],
  "query"
>;

export type GetMultiSearchOptions = Omit<
  paths["/3/search/multi"]["get"]["parameters"]["query"],
  "query"
>;

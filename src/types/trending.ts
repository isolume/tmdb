import type { paths } from "./tmdb";
import type { ResultItem } from "./common";

/* Full envelopes */
export type TrendingAllResponse =
  paths["/3/trending/all/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TrendingMovieResponse =
  paths["/3/trending/movie/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TrendingTvResponse =
  paths["/3/trending/tv/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TrendingPersonResponse =
  paths["/3/trending/person/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];

/* Item types (make them discriminated) */
export type TrendingMovieItem = ResultItem<TrendingMovieResponse> & {
  media_type: "movie";
  title?: string;
  release_date?: string;
};

export type TrendingTvItem = ResultItem<TrendingTvResponse> & {
  media_type: "tv";
  name?: string;
  first_air_date?: string;
};

export type TrendingPersonItem = ResultItem<TrendingPersonResponse> & {
  media_type: "person";
  name?: string;
  known_for_department?: string;
  known_for?: Array<TrendingMovieItem | TrendingTvItem>;
};

/* For /trending/all */
export type TrendingAllItem = TrendingMovieItem | TrendingTvItem | TrendingPersonItem;

/* If you still want a generic “any trending item” union: */
export type TrendingItem = TrendingAllItem;

export type TrendingResponse =
  | TrendingAllResponse
  | TrendingMovieResponse
  | TrendingTvResponse
  | TrendingPersonResponse;

type _AllParams = paths["/3/trending/all/{time_window}"]["get"]["parameters"];
type _MovieParams = paths["/3/trending/movie/{time_window}"]["get"]["parameters"];
type _TvParams = paths["/3/trending/tv/{time_window}"]["get"]["parameters"];
type _PersonParams = paths["/3/trending/person/{time_window}"]["get"]["parameters"];

export type TrendingTimeWindow = _AllParams["path"]["time_window"];
export type GetTrendingAllQuery = _AllParams["query"];
export type GetTrendingMovieQuery = _MovieParams["query"];
export type GetTrendingTvQuery = _TvParams["query"];
export type GetTrendingPersonQuery = _PersonParams["query"];

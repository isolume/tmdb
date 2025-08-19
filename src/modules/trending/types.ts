import type { paths } from "../../generated/tmdb";
import type { ResultItem, Paged } from "../../shared/common";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

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
export type TrendingMovieItem = ResultItem<TrendingMovieResponse> & { media_type: "movie" };
export type TrendingTvItem = ResultItem<TrendingTvResponse> & { media_type: "tv" };
export type TrendingPersonItem = ResultItem<TrendingPersonResponse> & { media_type: "person" };

/* Paged unions */
export type TrendingItem = TrendingMovieItem | TrendingTvItem | TrendingPersonItem;
export interface TrendingAll extends Paged<TrendingItem> {}
export interface TrendingMovies extends Paged<TrendingMovieItem> {}
export interface TrendingTv extends Paged<TrendingTvItem> {}
export interface TrendingPeople extends Paged<TrendingPersonItem> {}

type _AllParams = paths["/3/trending/all/{time_window}"]["get"]["parameters"];
type _MovieParams = paths["/3/trending/movie/{time_window}"]["get"]["parameters"];
type _TvParams = paths["/3/trending/tv/{time_window}"]["get"]["parameters"];
type _PersonParams = paths["/3/trending/person/{time_window}"]["get"]["parameters"];

export type TrendingTimeWindow = _AllParams["path"]["time_window"];
export type GetTrendingAllOptions = Prettify<_AllParams["query"]>;
export type GetTrendingMovieOptions = Prettify<_MovieParams["query"]>;
export type GetTrendingTvOptions = Prettify<_TvParams["query"]>;
export type GetTrendingPersonOptions = Prettify<_PersonParams["query"]>;

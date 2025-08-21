import type { paths } from "../../generated/tmdb";
import type { CamelCase } from "../../shared/types";

type TrendingAllApiResponse =
  paths["/3/trending/all/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TrendingAll = CamelCase<TrendingAllApiResponse>;

type TrendingMoviesApiResponse =
  paths["/3/trending/movie/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TrendingMovies = CamelCase<TrendingMoviesApiResponse>;

type TrendingTvShowsApiResponse =
  paths["/3/trending/tv/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TrendingTvShows = CamelCase<TrendingTvShowsApiResponse>;

type TrendingPeopleApiResponse =
  paths["/3/trending/person/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TrendingPeople = CamelCase<TrendingPeopleApiResponse>;

export type TrendingAllItem = NonNullable<TrendingAll["results"]>[number];
export type TrendingMovie = NonNullable<TrendingMovies["results"]>[number] & { mediaType: "movie" };
export type TrendingTvShow = NonNullable<TrendingTvShows["results"]>[number] & { mediaType: "tv" };
export type TrendingPerson = NonNullable<TrendingPeople["results"]>[number] & { mediaType: "person" };
export type TrendingMedia = TrendingMovie | TrendingTvShow | TrendingPerson;

export type TrendingTimeWindow =
  paths["/3/trending/all/{time_window}"]["get"]["parameters"]["path"]["time_window"];

type GetTrendingAllOptionsApiResponse =
  paths["/3/trending/all/{time_window}"]["get"]["parameters"]["query"];
export type GetTrendingAllOptions = CamelCase<GetTrendingAllOptionsApiResponse>;

type GetTrendingMovieOptionsApiResponse =
  paths["/3/trending/movie/{time_window}"]["get"]["parameters"]["query"];
export type GetTrendingMovieOptions = CamelCase<GetTrendingMovieOptionsApiResponse>;

type GetTrendingTvOptionsApiResponse =
  paths["/3/trending/tv/{time_window}"]["get"]["parameters"]["query"];
export type GetTrendingTvOptions = CamelCase<GetTrendingTvOptionsApiResponse>;

type GetTrendingPersonOptionsApiResponse =
  paths["/3/trending/person/{time_window}"]["get"]["parameters"]["query"];
export type GetTrendingPersonOptions = CamelCase<GetTrendingPersonOptionsApiResponse>;






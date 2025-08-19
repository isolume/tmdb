import type { paths } from "../../generated/tmdb";

export type TrendingAll =
  paths["/3/trending/all/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];

export type TrendingMovies =
  paths["/3/trending/movie/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];

export type TrendingTvShows =
  paths["/3/trending/tv/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];

export type TrendingPeople =
  paths["/3/trending/person/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];

export type TrendingAllItem = NonNullable<TrendingAll["results"]>[number];

export type TrendingMovie = NonNullable<TrendingMovies["results"]>[number] & {
  media_type: "movie";
};

export type TrendingTvShow = NonNullable<TrendingTvShows["results"]>[number] & { media_type: "tv" };

export type TrendingPerson = NonNullable<TrendingPeople["results"]>[number] & {
  media_type: "person";
};

export type TrendingMedia = TrendingMovie | TrendingTvShow | TrendingPerson;

export type TrendingTimeWindow =
  paths["/3/trending/all/{time_window}"]["get"]["parameters"]["path"]["time_window"]; // "day" | "week"

export type GetTrendingAllOptions =
  paths["/3/trending/all/{time_window}"]["get"]["parameters"]["query"];

export type GetTrendingMovieOptions =
  paths["/3/trending/movie/{time_window}"]["get"]["parameters"]["query"];

export type GetTrendingTvOptions =
  paths["/3/trending/tv/{time_window}"]["get"]["parameters"]["query"];

export type GetTrendingPersonOptions =
  paths["/3/trending/person/{time_window}"]["get"]["parameters"]["query"];

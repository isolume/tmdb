import type { paths } from "../../generated/tmdb";

export type Movie =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type MovieCredits =
  paths["/3/movie/{movie_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];

export type MovieImages =
  paths["/3/movie/{movie_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];

export type SimilarMovies =
  paths["/3/movie/{movie_id}/similar"]["get"]["responses"]["200"]["content"]["application/json"];

export type RecommendedMovies = SimilarMovies;

export type ImageFile =
  | NonNullable<MovieImages["backdrops"]>[number]
  | NonNullable<MovieImages["posters"]>[number]
  | NonNullable<MovieImages["logos"]>[number];

export type RecommendedMovie = NonNullable<RecommendedMovies["results"]>[number];

export type SimilarMovie = NonNullable<SimilarMovies["results"]>[number];

export type GetMovieOptions = paths["/3/movie/{movie_id}"]["get"]["parameters"]["query"];

export type GetMovieCreditsOptions =
  paths["/3/movie/{movie_id}/credits"]["get"]["parameters"]["query"];

export type GetMovieImagesOptions =
  paths["/3/movie/{movie_id}/images"]["get"]["parameters"]["query"];

export type GetRecommendedMoviesOptions =
  paths["/3/movie/{movie_id}/recommendations"]["get"]["parameters"]["query"];

export type GetSimilarMoviesOptions =
  paths["/3/movie/{movie_id}/similar"]["get"]["parameters"]["query"];

import type { paths } from "../../generated/tmdb";
import type { CamelCase } from "../../shared/types";

type MovieApiResponse =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type Movie = CamelCase<MovieApiResponse>;

type MovieCreditsApiResponse =
  paths["/3/movie/{movie_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];
export type MovieCredits = CamelCase<MovieCreditsApiResponse>;

type MovieImagesApiResponse =
  paths["/3/movie/{movie_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];
export type MovieImages = CamelCase<MovieImagesApiResponse>;

type SimilarMoviesApiResponse =
  paths["/3/movie/{movie_id}/similar"]["get"]["responses"]["200"]["content"]["application/json"];
export type SimilarMovies = CamelCase<SimilarMoviesApiResponse>;

export type RecommendedMovies = SimilarMovies;

type ImageFileApiResponse =
  | NonNullable<MovieImagesApiResponse["backdrops"]>[number]
  | NonNullable<MovieImagesApiResponse["posters"]>[number]
  | NonNullable<MovieImagesApiResponse["logos"]>[number];
export type ImageFile = CamelCase<ImageFileApiResponse>;

type RecommendedMovieApiResponse = NonNullable<SimilarMoviesApiResponse["results"]>[number];
export type RecommendedMovie = CamelCase<RecommendedMovieApiResponse>;

type SimilarMovieApiResponse = NonNullable<SimilarMoviesApiResponse["results"]>[number];
export type SimilarMovie = CamelCase<SimilarMovieApiResponse>;

type GetMovieOptionsApiResponse = paths["/3/movie/{movie_id}"]["get"]["parameters"]["query"];
export type GetMovieOptions = CamelCase<GetMovieOptionsApiResponse>;

type GetMovieCreditsOptionsApiResponse =
  paths["/3/movie/{movie_id}/credits"]["get"]["parameters"]["query"];
export type GetMovieCreditsOptions = CamelCase<GetMovieCreditsOptionsApiResponse>;

type GetMovieImagesOptionsApiResponse =
  paths["/3/movie/{movie_id}/images"]["get"]["parameters"]["query"];
export type GetMovieImagesOptions = CamelCase<GetMovieImagesOptionsApiResponse>;

type GetRecommendedMoviesOptionsApiResponse =
  paths["/3/movie/{movie_id}/recommendations"]["get"]["parameters"]["query"];
export type GetRecommendedMoviesOptions = CamelCase<GetRecommendedMoviesOptionsApiResponse>;

type GetSimilarMoviesOptionsApiResponse =
  paths["/3/movie/{movie_id}/similar"]["get"]["parameters"]["query"];
export type GetSimilarMoviesOptions = CamelCase<GetSimilarMoviesOptionsApiResponse>;

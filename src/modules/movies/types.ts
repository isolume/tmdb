import type { paths } from "../../generated/tmdb";
import type { ResultItem, Paged } from "../../shared/common";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** @internal */
type _MovieByIdResponse =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _MovieCreditsResponse =
  paths["/3/movie/{movie_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _MovieImagesResponse =
  paths["/3/movie/{movie_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _MovieRecommendationsResponse =
  paths["/3/movie/{movie_id}/recommendations"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _MovieSimilarResponse =
  paths["/3/movie/{movie_id}/similar"]["get"]["responses"]["200"]["content"]["application/json"];

// Canonical OpenAPI query params
type _MovieByIdQuery = paths["/3/movie/{movie_id}"]["get"]["parameters"]["query"];
type _MovieCreditsQuery = paths["/3/movie/{movie_id}/credits"]["get"]["parameters"]["query"];
type _MovieImagesQuery = paths["/3/movie/{movie_id}/images"]["get"]["parameters"]["query"];
type _MovieRecommendationsQuery =
  paths["/3/movie/{movie_id}/recommendations"]["get"]["parameters"]["query"];
type _MovieSimilarQuery = paths["/3/movie/{movie_id}/similar"]["get"]["parameters"]["query"];

/** Full movie details returned by `GET /3/movie/{movie_id}`. */
export type Movie = _MovieByIdResponse;

/** Credits (cast & crew) returned by `GET /3/movie/{movie_id}/credits`. */
export type MovieCredits = _MovieCreditsResponse;

/** Images (backdrops, posters, logos) returned by `GET /3/movie/{movie_id}/images`. */
export type MovieImages = _MovieImagesResponse;

/** One genre entry from `Movie.genres`. */
export type Genre = NonNullable<Movie["genres"]>[number];

/** A single image file (either from backdrops or posters). */
export type ImageFile =
  | NonNullable<MovieImages["backdrops"]>[number]
  | NonNullable<MovieImages["posters"]>[number];

/** A single recommended movie item. */
export type RecommendedMovie = ResultItem<_MovieRecommendationsResponse>;
/** A single similar movie item. */
export type SimilarMovie = ResultItem<_MovieSimilarResponse>;

/** Paged list of recommended movies. */
export interface MovieRecommendationsResponse extends Paged<RecommendedMovie> {}
/** Paged list of similar movies. */
export interface MovieSimilarResponse extends Paged<SimilarMovie> {}

/** Optional parameters for fetching a movie by ID. */
export type GetMovieOptions = Prettify<_MovieByIdQuery>;
/** Optional parameters for fetching credits. */
export type GetMovieCreditsOptions = Prettify<_MovieCreditsQuery>;
/** Optional parameters for fetching images. */
export type GetMovieImagesOptions = Prettify<_MovieImagesQuery>;
/** Optional parameters for fetching recommendations. */
export type GetMovieRecommendationsOptions = Prettify<_MovieRecommendationsQuery>;
/** Optional parameters for fetching similar movies. */
export type GetMovieSimilarOptions = Prettify<_MovieSimilarQuery>;

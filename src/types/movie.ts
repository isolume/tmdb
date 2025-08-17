import type { paths } from "./tmdb";

export type Movie =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type MovieCredits =
  paths["/3/movie/{movie_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];

export type Images =
  paths["/3/movie/{movie_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];

export type ImageFile =
  | NonNullable<Images["backdrops"]>[number]
  | NonNullable<Images["posters"]>[number];

export type Genre = NonNullable<Movie["genres"]>[number];

type _MovieByIdParams = paths["/3/movie/{movie_id}"]["get"]["parameters"];
export type GetMovieQuery = _MovieByIdParams["query"];

type _MovieCreditsParams = paths["/3/movie/{movie_id}/credits"]["get"]["parameters"];
export type GetMovieCreditsQuery = _MovieCreditsParams["query"];

type _MovieImagesParams = paths["/3/movie/{movie_id}/images"]["get"]["parameters"];
export type GetMovieImagesQuery = _MovieImagesParams["query"];

type _MovieRecommendationsParams = paths["/3/movie/{movie_id}/recommendations"]["get"]["parameters"];
export type GetMovieRecommendationsQuery = _MovieRecommendationsParams["query"];

type _MovieSimilarParams = paths["/3/movie/{movie_id}/similar"]["get"]["parameters"];
export type GetMovieSimilarQuery = _MovieSimilarParams["query"];

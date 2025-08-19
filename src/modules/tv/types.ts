import type { paths } from "../../generated/tmdb";
import type { ResultItem, Paged } from "../../shared/common";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** @internal */
type _TvByIdResponse =
  paths["/3/tv/{series_id}"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _TvCreditsResponse =
  paths["/3/tv/{series_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _TvImagesResponse =
  paths["/3/tv/{series_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _TvRecommendationsResponse =
  paths["/3/tv/{series_id}/recommendations"]["get"]["responses"]["200"]["content"]["application/json"];
/** @internal */
type _TvSimilarResponse =
  paths["/3/tv/{series_id}/similar"]["get"]["responses"]["200"]["content"]["application/json"];

/** @internal */
type _TvByIdQuery = paths["/3/tv/{series_id}"]["get"]["parameters"]["query"];
/** @internal */
type _TvCreditsQuery = paths["/3/tv/{series_id}/credits"]["get"]["parameters"]["query"];
/** @internal */
type _TvImagesQuery = paths["/3/tv/{series_id}/images"]["get"]["parameters"]["query"];
/** @internal */
type _TvRecommendationsQuery =
  paths["/3/tv/{series_id}/recommendations"]["get"]["parameters"]["query"];
/** @internal */
type _TvSimilarQuery = paths["/3/tv/{series_id}/similar"]["get"]["parameters"]["query"];

/** A TV show. */
export type TvShow = _TvByIdResponse;
/** A TV episode summary shape (last aired). */
export type EpisodeSummary = NonNullable<TvShow["last_episode_to_air"]>;
export type TvGenre = NonNullable<TvShow["genres"]>[number];

/** Credits for a TV show. */
export type TvCredits = _TvCreditsResponse;
/** Images for a TV show. */
export type TvImages = _TvImagesResponse;

/** A recommended TV show item. */
export type RecommendedTvShow = ResultItem<_TvRecommendationsResponse>;
/** A similar TV show item. */
export type SimilarTvShow = ResultItem<_TvSimilarResponse>;

/** Paged list of recommendations. */
export interface TvRecommendationsResponse extends Paged<RecommendedTvShow> {}
/** Paged list of similar TV shows. */
export interface TvSimilarResponse extends Paged<SimilarTvShow> {}

/** Optional parameters for fetching a TV show by ID. */
export type GetTvOptions = Prettify<_TvByIdQuery>;
/** Optional parameters for fetching credits. */
export type GetTvCreditsOptions = Prettify<_TvCreditsQuery>;
/** Optional parameters for fetching images. */
export type GetTvImagesOptions = Prettify<_TvImagesQuery>;
/** Optional parameters for fetching recommendations. */
export type GetTvRecommendationsOptions = Prettify<_TvRecommendationsQuery>;
/** Optional parameters for fetching similar TV shows. */
export type GetTvSimilarOptions = Prettify<_TvSimilarQuery>;

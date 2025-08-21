import type { paths } from "../../generated/tmdb";
import type { CamelCase } from "../../shared/types";

type TvShowApiResponse =
  paths["/3/tv/{series_id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TvShow = CamelCase<TvShowApiResponse>;

export type EpisodeSummary = NonNullable<TvShow["lastEpisodeToAir"]>;

type TvCreditsApiResponse =
  paths["/3/tv/{series_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];
export type TvCredits = CamelCase<TvCreditsApiResponse>;

type TvImagesApiResponse =
  paths["/3/tv/{series_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];
export type TvImages = CamelCase<TvImagesApiResponse>;

type SimilarTvShowsApiResponse =
  paths["/3/tv/{series_id}/similar"]["get"]["responses"]["200"]["content"]["application/json"];
export type SimilarTvShows = CamelCase<SimilarTvShowsApiResponse>;

export type RecommendedTvShows = SimilarTvShows;

export type SimilarTvShow = NonNullable<SimilarTvShows["results"]>[number];
export type RecommendedTvShow = NonNullable<RecommendedTvShows["results"]>[number];

type GetTvShowOptionsApiResponse = paths["/3/tv/{series_id}"]["get"]["parameters"]["query"];
export type GetTvShowOptions = CamelCase<GetTvShowOptionsApiResponse>;

type GetTvCreditsOptionsApiResponse =
  paths["/3/tv/{series_id}/credits"]["get"]["parameters"]["query"];
export type GetTvCreditsOptions = CamelCase<GetTvCreditsOptionsApiResponse>;

type GetTvImagesOptionsApiResponse =
  paths["/3/tv/{series_id}/images"]["get"]["parameters"]["query"];
export type GetTvImagesOptions = CamelCase<GetTvImagesOptionsApiResponse>;

type GetRecommendedTvShowsOptionsApiResponse =
  paths["/3/tv/{series_id}/recommendations"]["get"]["parameters"]["query"];
export type GetRecommendedTvShowsOptions = CamelCase<GetRecommendedTvShowsOptionsApiResponse>;

type GetSimilarTvShowsOptionsApiResponse =
  paths["/3/tv/{series_id}/similar"]["get"]["parameters"]["query"];
export type GetSimilarTvShowsOptions = CamelCase<GetSimilarTvShowsOptionsApiResponse>;

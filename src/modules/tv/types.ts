import type { paths } from "../../generated/tmdb";

export type TvShow =
  paths["/3/tv/{series_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type EpisodeSummary = NonNullable<TvShow["last_episode_to_air"]>;

export type TvCredits =
  paths["/3/tv/{series_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];

export type TvImages =
  paths["/3/tv/{series_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];

export type SimilarTvShows =
  paths["/3/tv/{series_id}/similar"]["get"]["responses"]["200"]["content"]["application/json"];

export type RecommendedTvShows = SimilarTvShows;

export type SimilarTvShow = NonNullable<SimilarTvShows["results"]>[number];
export type RecommendedTvShow = NonNullable<RecommendedTvShows["results"]>[number];

export type GetTvShowOptions = paths["/3/tv/{series_id}"]["get"]["parameters"]["query"];

export type GetTvCreditsOptions = paths["/3/tv/{series_id}/credits"]["get"]["parameters"]["query"];

export type GetTvImagesOptions = paths["/3/tv/{series_id}/images"]["get"]["parameters"]["query"];

export type GetRecommendedTvShowsOptions =
  paths["/3/tv/{series_id}/recommendations"]["get"]["parameters"]["query"];

export type GetSimilarTvShowsOptions =
  paths["/3/tv/{series_id}/similar"]["get"]["parameters"]["query"];

import type { paths } from "./tmdb";

export type TvShow =
  paths["/3/tv/{series_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type TvCredits =
  paths["/3/tv/{series_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];

export type TvImages =
  paths["/3/tv/{series_id}/images"]["get"]["responses"]["200"]["content"]["application/json"];

export type EpisodeSummary = NonNullable<TvShow["last_episode_to_air"]>;
export type TvGenre = NonNullable<TvShow["genres"]>[number];

type _TvByIdParams = paths["/3/tv/{series_id}"]["get"]["parameters"];
export type GetTvQuery = _TvByIdParams["query"];

type _TvCreditsParams = paths["/3/tv/{series_id}/credits"]["get"]["parameters"];
export type GetTvCreditsQuery = _TvCreditsParams["query"];

type _TvImagesParams = paths["/3/tv/{series_id}/images"]["get"]["parameters"];
export type GetTvImagesQuery = _TvImagesParams["query"];

type _TvRecommendationsParams = paths["/3/tv/{series_id}/recommendations"]["get"]["parameters"];
export type GetTvRecommendationsQuery = _TvRecommendationsParams["query"];

type _TvSimilarParams = paths["/3/tv/{series_id}/similar"]["get"]["parameters"];
export type GetTvSimilarQuery = _TvSimilarParams["query"];

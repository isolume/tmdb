import { HttpClient } from "../../core";
import type {
  TvShow,
  TvCredits,
  TvImages,
  GetTvOptions,
  GetTvCreditsOptions,
  GetTvImagesOptions,
  GetTvRecommendationsOptions,
  TvRecommendationsResponse,
  GetTvSimilarOptions,
  TvSimilarResponse,
} from "./types";

/**
 * Internal service for TMDB tv endpoints.
 * Not exposed to users — use the TMDB factory instead.
 * @internal
 */
export class TvService {
  constructor(private http: HttpClient) {}

  getById(id: number, opts?: GetTvOptions): Promise<TvShow> {
    return this.http.get<TvShow>(`/tv/${id}`, opts);
  }

  credits(id: number, opts?: GetTvCreditsOptions): Promise<TvCredits> {
    return this.http.get<TvCredits>(`/tv/${id}/credits`, opts);
  }

  images(id: number, opts?: GetTvImagesOptions): Promise<TvImages> {
    return this.http.get<TvImages>(`/tv/${id}/images`, opts);
  }

  recommendations(
    id: number,
    opts?: GetTvRecommendationsOptions
  ): Promise<TvRecommendationsResponse> {
    return this.http.get<TvRecommendationsResponse>(`/tv/${id}/recommendations`, opts);
  }

  similar(id: number, opts?: GetTvSimilarOptions): Promise<TvSimilarResponse> {
    return this.http.get<TvSimilarResponse>(`/tv/${id}/similar`, opts);
  }
}

import { HttpClient } from "../../core";
import { validateId } from "../../shared/validation";
import type {
  TvShow,
  TvCredits,
  TvImages,
  GetTvShowOptions,
  GetTvCreditsOptions,
  GetTvImagesOptions,
  GetRecommendedTvShowsOptions,
  RecommendedTvShows,
  GetSimilarTvShowsOptions,
  SimilarTvShows,
} from "./types";

/**
 * Internal service for TMDB tv endpoints.
 * Not exposed to users — use the TMDB factory instead.
 * @internal
 */
export class TvService {
  constructor(private http: HttpClient) {}

  get(id: number, opts?: GetTvShowOptions): Promise<TvShow> {
    validateId(id);
    return this.http.get<TvShow>(`/tv/${id}`, opts);
  }

  credits(id: number, opts?: GetTvCreditsOptions): Promise<TvCredits> {
    validateId(id);
    return this.http.get<TvCredits>(`/tv/${id}/credits`, opts);
  }

  images(id: number, opts?: GetTvImagesOptions): Promise<TvImages> {
    validateId(id);
    return this.http.get<TvImages>(`/tv/${id}/images`, opts);
  }

  recommendations(id: number, opts?: GetRecommendedTvShowsOptions): Promise<RecommendedTvShows> {
    validateId(id);
    return this.http.get<RecommendedTvShows>(`/tv/${id}/recommendations`, opts);
  }

  similar(id: number, opts?: GetSimilarTvShowsOptions): Promise<SimilarTvShows> {
    validateId(id);
    return this.http.get<SimilarTvShows>(`/tv/${id}/similar`, opts);
  }
}
